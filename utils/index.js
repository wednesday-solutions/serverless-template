import log from 'lambda-log';
import { STANDARD_API_MESSAGES } from '@utils/constants';

export const lambdaSuccess = (
	data,
	message = STANDARD_API_MESSAGES.SUCCESS,
	useStandardFormat = false
) => {
	log.info('success response', { data });
	if (useStandardFormat) {
		return {
			statusCode: 200,
			body: {
				data,
				status: message,
			},
		};
	}
	return {
		statusCode: 200,
		body: data,
	};
};

export const lambdaFailure = (errorData) => {
	log.error('error response', { errorData });

	const {
		errorMsg = errorData.message || 'somethingsss..',
		errorCode = errorData.code || 'E100',
		statusCode = 500,
	} = errorData;

	return {
		statusCode,
		body: {
			errorCode,
			errorMsg,
		},
	};
};
