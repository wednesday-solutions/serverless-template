import { CREATE_REMINDER_CONSTANTS } from '@utils/constants/sesConstants';
const {
	correctEmailsRequiredMessage,
	emptyParamsPassedErrorMessage,
	correctParamsRequiredMessage,
} = CREATE_REMINDER_CONSTANTS;

const SuccessData = {
	apiResponse: {
		$metadata: {
			httpStatusCode: 200,
			requestId: '72816e47-7683-4fe8-8f44-a778cd5b2906',
			extendedRequestId: undefined,
			cfId: undefined,
			attempts: 1,
			totalRetryDelay: 0,
		},
		MessageId: '010901842ea8c74a-471d304f-a123-4c2d-81e0-9b35755e7714-000000',
	},
	functionResponse: {
		data: {
			messageId: '010901842ea8c74a-471d304f-a123-4c2d-81e0-9b35755e7714-000000',
		},
	},
};

const MissingParamsData = {
	functionResponse: {
		error: emptyParamsPassedErrorMessage,
	},
};

const PartialMissingParamsData = {
	functionResponse: {
		error: correctParamsRequiredMessage,
	},
};

const WrongEmailsData = {
	apiResponse: { error: correctEmailsRequiredMessage },
	functionResponse: {
		error: correctEmailsRequiredMessage,
	},
};

const FailureData = {
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

const mockTextMessage = 'This is the message body in text format.';
const mockHTMLMessage = '<p>This is the message body in html format.</p>';
const mockSubject = 'Test email';

const mockSendTextEmailContentData = {
	functionResponse: {
		Body: {
			Text: {
				Charset: 'UTF-8',
				Data: mockTextMessage,
			},
		},
		Subject: {
			Charset: 'UTF-8',
			Data: mockSubject,
		},
	},
};

const mockSendHTMLEmailContentData = {
	isHtmlMessage: true,
	functionResponse: {
		Body: {
			Html: {
				Charset: 'UTF-8',
				Data: mockHTMLMessage,
			},
		},
		Subject: {
			Charset: 'UTF-8',
			Data: mockSubject,
		},
	},
};

const mockSendTextEmailBodyData = {
	functionResponse: {
		Text: {
			Charset: 'UTF-8',
			Data: mockTextMessage,
		},
	},
};
const mockSendHTMLEmailBodyData = {
	isHtmlMessage: true,
	functionResponse: {
		Html: {
			Charset: 'UTF-8',
			Data: mockHTMLMessage,
		},
	},
};

export const SESMockData = {
	SuccessData,
	MissingParamsData,
	PartialMissingParamsData,
	WrongEmailsData,
	FailureData,
	mockTextMessage,
	mockHTMLMessage,
	mockSubject,
	mockSendTextEmailContentData,
	mockSendHTMLEmailContentData,
	mockSendTextEmailBodyData,
	mockSendHTMLEmailBodyData,
};
