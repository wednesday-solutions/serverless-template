import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';

import { lambdaSuccess, lambdaFailure } from '@utils';
import { RESPONSE_SERIALIZER } from '@utils/constants';

const baseHandler = async (event, _context, callback) => {
	console.log({ event });
	try {
		const response = 'Hey Lambda !';
		return lambdaSuccess(response, 'success', true);
	} catch (error) {
		console.error({ error });
		return lambdaFailure(error);
	}
};

const handler = middy(baseHandler)
	.use(jsonBodyParser())
	.use(doNotWaitForEmptyEventLoop())
	.use(
		httpResponseSerializer({
			serializers: RESPONSE_SERIALIZER,
			default: 'application/json',
		})
	)
	.use(JSONErrorHandlerMiddleware());

export { handler };
