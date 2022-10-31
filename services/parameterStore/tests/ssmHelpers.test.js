import { mockClient } from 'aws-sdk-client-mock';
import { GetParametersCommand } from '@aws-sdk/client-ssm';
import {
	SSM_SUCCESS_DATA,
	SSM_FAILURE_DATA,
} from '@utils/mockData/ssmMockData';
import {
	CREATE_REMINDER_CONSTANTS,
	EMAIL_SSM_NAMES,
} from '@utils/constants/sesConstants';

import { ssmClient } from '../ssmClient';
import { getParamsFromSSM, handleSSMResponse } from '../ssmHelpers';

const { correctEmailsRequiredMessage } = CREATE_REMINDER_CONSTANTS;

describe('ssm helpers test suite', () => {
	describe('getParamsFromSSM tests', () => {
		let ssmMock;
		beforeEach(() => {
			ssmMock = mockClient(ssmClient);
		});
		it('should handle case where ssm params exist as expected', async () => {
			const { apiResponse, functionResponse } = SSM_SUCCESS_DATA;

			ssmMock.on(GetParametersCommand).resolvesOnce(apiResponse);
			const response = await getParamsFromSSM(
				EMAIL_SSM_NAMES,
				correctEmailsRequiredMessage
			);
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where ssm params do not exist as expected', async () => {
			const { apiResponse, functionResponse } = SSM_FAILURE_DATA;

			ssmMock.on(GetParametersCommand).resolvesOnce(apiResponse);
			const response = await getParamsFromSSM(
				EMAIL_SSM_NAMES,
				correctEmailsRequiredMessage
			);
			expect(response).toEqual(functionResponse);
		});
	});
	describe('handleSSMResponse tests', () => {
		it('should handle case where response provided matches success scenario', () => {
			const { apiResponse, functionResponse } = SSM_SUCCESS_DATA;

			const response = handleSSMResponse(
				apiResponse,
				correctEmailsRequiredMessage
			);
			expect(response).toEqual(functionResponse);
		});
		it('should handle case where response provided matches error scenario', () => {
			const { apiResponse, functionResponse } = SSM_FAILURE_DATA;

			const response = handleSSMResponse(
				apiResponse,
				correctEmailsRequiredMessage
			);
			expect(response).toEqual(functionResponse);
		});
	});
});
