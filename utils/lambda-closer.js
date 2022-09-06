import createError from 'http-errors';
import { HTTP_SUCCESS_CODES } from './constants';
import { SuccessResponse, ErrorResponse } from './response';

class LambdaCloser {
	constructor(params) {
		this.data = params;
	}

	getSuccessResponseBody() {
		return new SuccessResponse(this.data);
	}

	getErrorResponseBody() {
		return new ErrorResponse(this.data);
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
