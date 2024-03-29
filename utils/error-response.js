import ERROR_CODE_MESSAGES from './error-code-messages';

class ErrorResponse {
	constructor({ code, message }) {
		this.code = code || 'E_Unknown';
		this.message = ERROR_CODE_MESSAGES[code] || message;
	}
}

export default ErrorResponse;
