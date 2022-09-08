import ERROR_CODE_MESSAGES from './error-code-messages';

export class SuccessResponse {
	constructor({ message, data }) {
		this.message = message;
		this.data = data;
	}
}

export class ErrorResponse {
	constructor({ code, message }) {
		this.message = ERROR_CODE_MESSAGES[code] || message;
		this.code = code || 'E_Unknown';
	}
}
