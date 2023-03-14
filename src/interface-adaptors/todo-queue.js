/**
 * write methods to interact with the todo queue. this layer uses the queue driver
 */

import pushToQueue from '../drivers/queue-driver';

const pushToTodoQueue = async ({ title, description }) => {
	await pushToQueue('queue-id', {
		title,
		description,
		createdAt: new Date().toUTCString(),
	});
};

export default pushToTodoQueue;
