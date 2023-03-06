/**
 * a driver to use SQS or any message broker.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { SQS } from '@aws-sdk/client-sqs';

const pushToQueue = async (queueId, message) => {
	const queue = new SQS(queueId);
	await queue.send(message);
	// ... implement aws sns specific way to push a message to a queue
	// this layer decouples the interface-adaptor from Sns.
};

export default pushToQueue;
