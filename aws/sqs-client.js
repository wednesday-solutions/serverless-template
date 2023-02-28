// eslint-disable-next-line import/no-extraneous-dependencies
import {
	ReceiveMessageCommand,
	SendMessageCommand,
	SQSClient,
} from '@aws-sdk/client-sqs';
import logger from '@utils/logger';

class Queue extends SQSClient {
	constructor({ endpoint }) {
		if (!endpoint) {
			throw new Error('No endpoint provided for queue');
		}

		super({
			endpoint,
		});
	}

	enqueue(input) {
		logger.debug(input);
		const command = new SendMessageCommand(input);
		return this.send(command);
	}

	dequeue() {
		const command = new ReceiveMessageCommand({
			QueueUrl: this.config.endpoint,
		});
		return this.send(command);
	}
}

export default Queue;
