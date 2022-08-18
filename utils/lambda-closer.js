import { STATUS_CODES } from './constants';
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
			statusCode: STATUS_CODES.ok,
			body: this.getSuccessResponseBody(),
		};
	}

	badRequest() {
		return {
			statusCode: STATUS_CODES.badRequest,
			body: this.getErrorResponseBody(),
		};
	}

	notFound() {
		return {
			statusCode: STATUS_CODES.notFound,
			body: this.getErrorResponseBody(),
		};
	}

	error() {
		console.error(this.data);
		return {
			statusCode: STATUS_CODES.error,
			body: this.getErrorResponseBody(),
		};
	}
}

export default LambdaCloser;
