import { mockClient } from 'aws-sdk-client-mock';
import { SubscribeCommand } from '@aws-sdk/client-sns';

import { CREATE_SUBSCRIPTION_CONSTANTS } from '@utils/constants/snsConstants';

import { subscribeToEmail } from '../subscriptions';
import { snsClient } from '../snsClient';

const snsMock = mockClient(snsClient);

describe('SNS serice subscription for a topic tests suite', () => {
	// let snsMockResponse;
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

		// it('should call the snsClient with SubscribeCommand', async () => {});
	});
});
