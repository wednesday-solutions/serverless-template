import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';

import { RESPONSE_SERIALIZER } from './constants';

class LambdaBuilder {
	constructor(handler) {
		this.middifiedHandler = middy(handler);
	}

	getLambdaHandler() {
		return this.middifiedHandler;
	}

	buildBasicMiddlewares() {
		this.addJSONBodyParser();
		this.addEmptyEventLoopSkip();
		this.addJSONErrorHandlerMiddleware();
		this.addResponseSerializer();

		return this;
	}

	addJSONBodyParser() {
		this.middifiedHandler.use(jsonBodyParser());
		return this;
	}

	addEmptyEventLoopSkip() {
		this.middifiedHandler.use(doNotWaitForEmptyEventLoop());
		return this;
	}

	addResponseSerializer() {
		this.middifiedHandler.use(
			httpResponseSerializer({
				serializers: RESPONSE_SERIALIZER,
				default: 'application/json',
			})
		);
		return this;
	}

	addJSONErrorHandlerMiddleware() {
		this.middifiedHandler.use(JSONErrorHandlerMiddleware());
		return this;
	}
}

export default LambdaBuilder;
