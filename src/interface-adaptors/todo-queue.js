/**
 * write methods to interact with the todo queue. this layer uses the queue driver
 */

import Todo from '../entities/todos';
import pushToQueue from '../drivers/queue-driver';

const pushToTodoQueue = ({ title, description }) => {
	pushToQueue(
		'queue-id',
		Todo({ title, description, createdAt: new Date().toUTCString() })
	);
};

export default pushToTodoQueue;
