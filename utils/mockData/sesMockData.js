import { CREATE_REMINDER_CONSTANTS } from '@utils/constants/sesConstants';
const {
	correctEmailsRequiredMessage,
	emptyParamsPassedErrorMessage,
	correctParamsRequiredMessage,
} = CREATE_REMINDER_CONSTANTS;

export const SES_SUCCESS_DATA = {
	apiResponse: {
		$metadata: {
			httpStatusCode: 200,
			requestId: '72816e47-7683-4fe8-8f44-a778cd5b2906',
			extendedRequestId: undefined,
			cfId: undefined,
			attempts: 1,
			totalRetryDelay: 0,
		},
		MessageId: '010901842ea8c74a-471d304f-d523-4c2d-81e0-9b35755e7714-000000',
	},
	functionResponse: {
		data: {
			messageId: '010901842ea8c74a-471d304f-d523-4c2d-81e0-9b35755e7714-000000',
		},
	},
};

export const SES_WRONG_EMAILS_DATA = {
	apiResponse: { error: correctEmailsRequiredMessage },
	functionResponse: {
		error: correctEmailsRequiredMessage,
	},
};

export const SES_MISSING_PARAMS_DATA = {
	functionResponse: {
		error: emptyParamsPassedErrorMessage,
	},
};

export const SES_PARTIAL_MISSING_PARAMS_DATA = {
	functionResponse: {
		error: correctParamsRequiredMessage,
	},
};

export const SES_FAILURE_DATA = {
	apiResponse: {
		message: 'Unavailable Operation',
		$fault: 'client',
		$metadata: {
			httpStatusCode: 400,
			requestId: '14149e95-c608-4aaa-8743-97358c755929',
			extendedRequestId: undefined,
			cfId: undefined,
			attempts: 1,
			totalRetryDelay: 0,
		},
		Type: 'Sender',
		Code: 'InvalidAction',
	},
	functionResponse: { error: 'Unavailable Operation' },
};

export const MOCK_TEXT_SEND_EMAIL_DATA = {
	message: 'This is the message body in text format.',
	subject: 'Test email',
	functionResponse: {
		Body: {
			Text: {
				Charset: 'UTF-8',
				Data: 'This is the message body in text format.',
			},
		},
		Subject: {
			Charset: 'UTF-8',
			Data: 'Test email',
		},
	},
};
export const MOCK_HTML_SEND_EMAIL_DATA = {
	message: 'This is the message body in text format.',
	subject: 'Test email',
	isHtmlMessage: true,
	functionResponse: {
		Body: {
			Html: {
				Charset: 'UTF-8',
				Data: 'This is the message body in text format.',
			},
		},
		Subject: {
			Charset: 'UTF-8',
			Data: 'Test email',
		},
	},
};

export const MOCK_TEXT_SEND_EMAIL_BODY_DATA = {
	message: 'This is the message body in text format.',
	functionResponse: {
		Text: {
			Charset: 'UTF-8',
			Data: 'This is the message body in text format.',
		},
	},
};
export const MOCK_HTML_SEND_EMAIL_BODY_DATA = {
	message: 'This is the message body in text format.',
	isHtmlMessage: true,
	functionResponse: {
		Html: {
			Charset: 'UTF-8',
			Data: 'This is the message body in text format.',
		},
	},
};
