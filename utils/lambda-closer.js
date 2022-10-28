import createError from 'http-errors';
import { HTTP_SUCCESS_CODES } from './constants';
import { SuccessResponse, ErrorResponse } from './response';

/**
 *
 * construct { message, data } for success responses
 * construct { message, code } for error responses
 *
 */
class LambdaCloser {
	constructor({ message, data, code }) {
		if (!message && !data && !code) {
			throw new Error('Close the lambda with atleast 1 response parameter');
		}
		this.responseData = { message, data, code };
	}

	getSuccessResponseBody() {
		return new SuccessResponse(this.responseData);
	}

	getErrorResponseBody() {
		return new ErrorResponse(this.responseData);
	}

	ok() {
		return {
			statusCode: HTTP_SUCCESS_CODES.ok,
			body: this.getSuccessResponseBody(),
		};
	}

	created() {
		return {
			statusCode: HTTP_SUCCESS_CODES.created,
			body: this.getSuccessResponseBody(),
		};
	}

	badRequest() {
		return {
			...new createError.BadRequest(),
			body: this.getErrorResponseBody(),
		};
	}

	notFound() {
		return {
			...new createError.NotFound(),
			body: this.getErrorResponseBody(),
		};
	}

	internalServerError() {
		return {
			...new createError.InternalServerError(),
			body: this.getErrorResponseBody(),
		};
	}
}

export default LambdaCloser;
