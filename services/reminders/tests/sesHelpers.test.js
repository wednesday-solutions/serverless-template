import { mockClient } from 'aws-sdk-client-mock';
import { SendEmailCommand } from '@aws-sdk/client-ses';

import { SESMockData } from '@utils/mockData/sesMockData';
import * as ssmUtils from '@services/parameterStore/ssmHelpers';

import { sesClient } from '../sesClient';
import { sendEmail, formatEmailContent, formatEmailBody } from '../sesHelpers';

const {
	SuccessData,
	MissingParamsData,
	PartialMissingParamsData,
	WrongEmailsData,
	FailureData,
	mockTextMessage: textMessage,
	mockHTMLMessage: htmlMessage,
	mockSubject: subject,
	mockSendTextEmailContentData,
	mockSendHTMLEmailContentData,
	mockSendTextEmailBodyData,
	mockSendHTMLEmailBodyData,
} = SESMockData;

describe('ses helpers test suite', () => {
	describe('sendEmail tests', () => {
		let sesMock;
		beforeEach(() => {
			sesMock = mockClient(sesClient);
		});
		it('should handle case where sending email succeeds as expected', async () => {
			const { apiResponse, functionResponse } = SuccessData;

			sesMock.on(SendEmailCommand).resolvesOnce(apiResponse);
			const response = await sendEmail({ message: textMessage, subject });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where no parameters are not passed in', async () => {
			const { functionResponse } = MissingParamsData;

			const response = await sendEmail();
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where one of the parameters is not passed in', async () => {
			const { functionResponse } = PartialMissingParamsData;

			const response = await sendEmail({ message: textMessage });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where one of the parameters is not passed in', async () => {
			const { functionResponse } = PartialMissingParamsData;

			const response = await sendEmail({ subject });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where finding email addresses from parameter store fails', async () => {
			const { apiResponse, functionResponse } = WrongEmailsData;
			jest
				.spyOn(ssmUtils, 'getParamsFromSSM')
				.mockResolvedValueOnce(apiResponse);

			const response = await sendEmail({ message: textMessage, subject });
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where sending email fails as expected', async () => {
			const { apiResponse, functionResponse } = FailureData;

			sesMock.on(SendEmailCommand).rejectsOnce(apiResponse);
			const response = await sendEmail({ message: textMessage, subject });
			expect(response).toEqual(functionResponse);
		});
	});
	describe('formatEmailContent tests', () => {
		it('should use the params and return formatted Body with subject and text body as expected', () => {
			const { functionResponse } = mockSendTextEmailContentData;

			const response = formatEmailContent({ message: textMessage, subject });
			expect(response).toEqual(functionResponse);
		});
		it('should use the params and return formatted Body with subject and html body as expected', () => {
			const { isHtmlMessage, functionResponse } = mockSendHTMLEmailContentData;

			const response = formatEmailContent({
				message: htmlMessage,
				subject,
				isHtmlMessage,
			});
			expect(response).toEqual(functionResponse);
		});
	});
	describe('formatEmailBody tests', () => {
		it('should use the params and return text body as expected', () => {
			const { functionResponse } = mockSendTextEmailBodyData;

			const response = formatEmailBody({ message: textMessage });
			expect(response).toEqual(functionResponse);
		});
		it('should use the params and return html body as expected', () => {
			const { isHtmlMessage, functionResponse } = mockSendHTMLEmailBodyData;

			const response = formatEmailBody({ message: htmlMessage, isHtmlMessage });
			expect(response).toEqual(functionResponse);
		});
	});
});
