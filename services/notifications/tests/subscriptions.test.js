import { mockClient } from 'aws-sdk-client-mock';
import { SubscribeCommand } from '@aws-sdk/client-sns';

import { CREATE_SUBSCRIPTION_CONSTANTS } from '@utils/constants/snsConstants';
import { SNS_MOCK_RESPONSE } from '@utils/mockData/snsMockData';

import { subscribeToEmail } from '../subscriptions';
import { snsClient } from '../snsClient';

const snsMock = mockClient(snsClient);

describe('SNS serice subscription for a topic tests suite', () => {
	let response;

	beforeAll(() => {
		snsMock.resolves({});
	});

	describe('subscribeToEmail method tests', () => {
		const email = 'test@example.com';
		const topicArn = 'test:topic:arn';

		it('should return an empty object if no parameters are provided', async () => {
			response = await subscribeToEmail();
			expect(response).toEqual({});
		});

		it('should return a error message if correct params are not provided', async () => {
			response = await subscribeToEmail({
				emailAddress: email,
				topic: topicArn,
			});
			expect(response.error).toBeDefined();
			expect(response.error).toEqual(
				CREATE_SUBSCRIPTION_CONSTANTS.correctParamsRequiredMessage
			);
		});

		it('should call the snsClient with SubscribeCommand', async () => {
			snsMock.on(SubscribeCommand).resolves(SNS_MOCK_RESPONSE);
			response = await subscribeToEmail({ email, topicArn });
			expect(response.data).toBeDefined();
			expect(response.data).toEqual(SNS_MOCK_RESPONSE);
		});
	});
});
