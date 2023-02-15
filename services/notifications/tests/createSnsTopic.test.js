import { mockClient } from 'aws-sdk-client-mock';
import { CreateTopicCommand } from '@aws-sdk/client-sns';

import { SNS_MOCK_RESPONSE } from '@utils/mockData/snsMockData';

import { CREATE_SNS_TOPIC_CONSTANTS } from '@utils/constants/snsConstants';
import { createSnsTopic } from '../createSnsTopic';
import { snsClient } from '../snsClient';

const snsMock = mockClient(snsClient);

describe('Tests for createSnsTopic method', () => {
	let response;
	const topicName = 'Test Topic';

	beforeAll(() => {
		snsMock.resolves({});
	});

	it('should throw if topicName is not passed', async () => {
		const error = new Error(
			CREATE_SNS_TOPIC_CONSTANTS.topicNameNotProvidedErrorMessage
		);

		expect(async () => {
			await createSnsTopic();
		}).rejects.toThrowError(error);
	});

	it('should call the sns client with CreateTopicCommand', async () => {
		snsMock.on(CreateTopicCommand).resolvesOnce(SNS_MOCK_RESPONSE);
		response = await createSnsTopic(topicName);
		expect(response).toEqual(SNS_MOCK_RESPONSE);
	});

	it('should return error accordingly', async () => {
		const errorMessage = 'Error creating topic';
		const error = new Error(errorMessage);
		snsMock.on(CreateTopicCommand).rejects(error);
		response = await createSnsTopic(topicName);
		expect(response.error).toEqual(errorMessage);
	});
});
