/**
 * write methods to interact with the todo queue. this layer uses the queue driver
 */

import Todo from '../1-entities/todos';
import pushToQueue from '../4-drivers/queue-driver';

const pushToTodoQueue = ({ title, description }) => {
	pushToQueue(
		'queue-id',
		new Todo({ title, description, createdAt: new Date().toUTCString() })
	);
};

export default pushToTodoQueue;
