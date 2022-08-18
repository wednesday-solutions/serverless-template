import {
	ReceiveMessageCommand,
	SendMessageCommand,
	SQSClient,
} from '@aws-sdk/client-sqs';

class Queue extends SQSClient {
	constructor() {
		super({
			endpoint:
				'https://sqs.ap-south-1.amazonaws.com/172840532362/local_Hi.fifo',
		});
	}

	enqueue(input) {
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
