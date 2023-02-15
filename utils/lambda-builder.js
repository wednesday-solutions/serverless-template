/* eslint-disable no-param-reassign */
import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import errorLogger from '@middy/error-logger';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import { lambdaRequestTracker, pinoLambdaDestination } from 'pino-lambda';
import {
	closeDatabaseConnection,
	connectToDatabase,
} from '../src/drivers/sequelize';
import LambdaCloser from './lambda-closer';

import { initializeLogger } from './logger';

class LambdaBuilder {
	constructor(handler) {
		this.middifiedHandler = middy(handler);
	}

	getLambdaHandler() {
		return this.middifiedHandler;
	}

	/**
	 *
	 * @documentation Find more middlewares here
	 **  https://middy.js.org/docs/middlewares/intro
	 */
	buildBasicMiddlewares() {
		this.addJSONBodyParser();
		this.addEmptyEventLoopSkip();
		this.addEventNormalizer();
		this.addErrorLogger();
		this.addLogger();
		this.errorHandler();
		this.addResponseSerializer();
		this.addDatabaseConnection();

		return this;
	}

	addJSONBodyParser() {
		this.middifiedHandler.use(jsonBodyParser());
		return this;
	}

	addEventNormalizer() {
		this.middifiedHandler.use(httpEventNormalizer());
		return this;
	}

	addEmptyEventLoopSkip() {
		this.middifiedHandler.use(doNotWaitForEmptyEventLoop());
		return this;
	}

	addResponseSerializer() {
		this.middifiedHandler.use(
			httpResponseSerializer({
				serializers: [
					{
						regex: /^application\/json$/,
						serializer: ({ body }) => JSON.stringify(body),
					},
				],
				default: 'application/json',
			})
		);
		return this;
	}

	addLogger() {
		this.middifiedHandler.use({
			before: async (request) => {
				const { event, context } = request;
				const destination = pinoLambdaDestination();
				const logger = initializeLogger(destination);
				const withRequest = lambdaRequestTracker();
				request.context.logger = logger;
				withRequest(event, context);
			},
		});
		return this;
	}

	addErrorLogger() {
		this.middifiedHandler.use(errorLogger());
		return this;
	}

	errorHandler() {
		this.middifiedHandler.use({
			onError: async (event) => {
				event.response = new LambdaCloser({
					message: event.error.message,
				}).internalServerError();
			},
		});
		return this;
	}

	addDatabaseConnection() {
		this.middifiedHandler.use({
			before: async () => {
				await connectToDatabase();
			},
			after: async () => {
				await closeDatabaseConnection();
			},
		});
	}
}

export default LambdaBuilder;
