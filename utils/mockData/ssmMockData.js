import {
	CREATE_REMINDER_CONSTANTS,
	EMAIL_SSM_NAMES,
} from '@utils/constants/sesConstants';

export const SSM_SUCCESS_DATA = {
	apiResponse: {
		$metadata: {
			httpStatusCode: 200,
			requestId: 'ce98442a-dfa3-40d3-829b-7b1057ea02e6',
			attempts: 1,
			totalRetryDelay: 0,
		},
		InvalidParameters: [],
		Parameters: [
			{
				ARN: 'arn:aws:ssm:ap-south-1:id:parameter/ses/todo-to-email',
				DataType: 'text',
				LastModifiedDate: '2022-10-22T18:18:01.218Z',
				Name: EMAIL_SSM_NAMES[0],
				Type: 'String',
				Value: 'test@wednesday.is',
				Version: 1,
			},
			{
				ARN: 'arn:aws:ssm:ap-south-1:id:parameter/ses/todo-from-email',
				DataType: 'text',
				LastModifiedDate: '2022-10-22T20:18:01.218Z',
				Name: EMAIL_SSM_NAMES[1],
				Type: 'String',
				Value: 'test@wednesday.is',
				Version: 1,
			},
		],
	},
	functionResponse: {
		data: [
			{
				name: EMAIL_SSM_NAMES[0],

				value: 'test@wednesday.is',
			},
			{
				name: EMAIL_SSM_NAMES[1],

				value: 'test@wednesday.is',
			},
		],
	},
};

export const SSM_FAILURE_DATA = {
	apiResponse: {
		$metadata: {
			httpStatusCode: 200,
			requestId: 'ce98442a-dfa3-40d3-829b-7b1057ea02e6',
			attempts: 1,
			totalRetryDelay: 0,
		},
		InvalidParameters: [EMAIL_SSM_NAMES[0]],
		Parameters: [
			{
				ARN: 'arn:aws:ssm:ap-south-1:id:parameter/ses/todo-from-email',
				DataType: 'text',
				LastModifiedDate: '2022-10-22T20:18:01.218Z',
				Name: EMAIL_SSM_NAMES[1],
				Type: 'String',
				Value: 'test@wednesday.is',
				Version: 1,
			},
		],
	},
	functionResponse: {
		error: CREATE_REMINDER_CONSTANTS.correctEmailsRequiredMessage,
	},
};
