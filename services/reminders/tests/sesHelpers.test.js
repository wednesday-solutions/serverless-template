import { mockClient } from 'aws-sdk-client-mock';
import { SendEmailCommand } from '@aws-sdk/client-ses';

import {
	SES_SUCCESS_DATA,
	SES_FAILURE_DATA,
	SES_MISSING_PARAMS_DATA,
	SES_WRONG_EMAILS_DATA,
	SES_PARTIAL_MISSING_PARAMS_DATA,
	MOCK_TEXT_SEND_EMAIL_DATA,
	MOCK_HTML_SEND_EMAIL_DATA,
	MOCK_HTML_SEND_EMAIL_BODY_DATA,
	MOCK_TEXT_SEND_EMAIL_BODY_DATA,
} from '@utils/mockData/sesMockData';
import * as ssmUtils from '@services/parameterStore/ssmHelpers';

import { sesClient } from '../sesClient';
import { sendEmail, formatEmailContent, formatEmailBody } from '../sesHelpers';

describe('ses helpers test suite', () => {
	describe('sendEmail tests', () => {
		let sesMock;
		beforeEach(() => {
			sesMock = mockClient(sesClient);
		});
		it('should handle case where sending email succeeds as expected', async () => {
			const { message, subject } = MOCK_TEXT_SEND_EMAIL_DATA;
			const { apiResponse, functionResponse } = SES_SUCCESS_DATA;

			sesMock.on(SendEmailCommand).resolvesOnce(apiResponse);
			const response = await sendEmail({ message, subject });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where no parameters are not passed in', async () => {
			const { functionResponse } = SES_MISSING_PARAMS_DATA;

			const response = await sendEmail();
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where one of the parameters is not passed in', async () => {
			const { message } = MOCK_TEXT_SEND_EMAIL_DATA;
			const { functionResponse } = SES_PARTIAL_MISSING_PARAMS_DATA;

			const response = await sendEmail({ message });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where one of the parameters is not passed in', async () => {
			const { subject } = MOCK_TEXT_SEND_EMAIL_DATA;
			const { functionResponse } = SES_PARTIAL_MISSING_PARAMS_DATA;

			const response = await sendEmail({ subject });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where finding email addresses from parameter store fails', async () => {
			const { message, subject } = MOCK_TEXT_SEND_EMAIL_DATA;
			const { apiResponse, functionResponse } = SES_WRONG_EMAILS_DATA;
			jest
				.spyOn(ssmUtils, 'getParamsFromSSM')
				.mockResolvedValueOnce(apiResponse);

			const response = await sendEmail({ message, subject });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where sending email fails as expected', async () => {
			const { message, subject } = MOCK_TEXT_SEND_EMAIL_DATA;
			const { apiResponse, functionResponse } = SES_FAILURE_DATA;

			sesMock.on(SendEmailCommand).rejectsOnce(apiResponse);
			const response = await sendEmail({ message, subject });
			expect(response).toEqual(functionResponse);
		});
	});
	describe('formatEmailContent tests', () => {
		it('should use the params and return formatted Body with subject and text body as expected', () => {
			const { message, subject, functionResponse } = MOCK_TEXT_SEND_EMAIL_DATA;

			const response = formatEmailContent({ message, subject });
			expect(response).toEqual(functionResponse);
		});
		it('should use the params and return formatted Body with subject and html body as expected', () => {
			const {
				message,
				subject,
				isHtmlMessage,
				functionResponse,
			} = MOCK_HTML_SEND_EMAIL_DATA;

			const response = formatEmailContent({ message, subject, isHtmlMessage });
			expect(response).toEqual(functionResponse);
		});
	});
	describe('formatEmailBody tests', () => {
		it('should use the params and return text body as expected', () => {
			const { message, functionResponse } = MOCK_TEXT_SEND_EMAIL_BODY_DATA;

			const response = formatEmailBody({ message });
			expect(response).toEqual(functionResponse);
		});
		it('should use the params and return html body as expected', () => {
			const {
				message,
				isHtmlMessage,
				functionResponse,
			} = MOCK_HTML_SEND_EMAIL_BODY_DATA;

			const response = formatEmailBody({ message, isHtmlMessage });
			expect(response).toEqual(functionResponse);
		});
	});
});
