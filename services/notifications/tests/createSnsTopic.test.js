import { mockClient } from 'aws-sdk-client-mock';
import { CreateTopicCommand } from '@aws-sdk/client-sns';

import { createSnsTopic, snsClient } from '../createSnsTopic';

const snsMock = mockClient(snsClient);

describe('Tests for createSnsTopic method', () => {
	let snsMockResponse;
	const topicName = 'Test Topic';

	beforeAll(() => {
		snsMock.resolves({});
	});

	it('should call the sns client with CreateTopicCommand', async () => {
		snsMockResponse = {
			MessageId: '12345678-1111-2222-3333-111122223333',
		};

		snsMock.on(CreateTopicCommand).resolvesOnce(snsMockResponse);
		const response = await createSnsTopic(topicName);
		expect(response).toEqual(snsMockResponse);
	});

	it('should return error accordingly', async () => {
		const errorMessage = 'Error creating topic';
		const error = new Error(errorMessage);
		snsMock.on(CreateTopicCommand).rejects(error);
		const response = await createSnsTopic(topicName);
		expect(response.error).toEqual(errorMessage);
	});
});
