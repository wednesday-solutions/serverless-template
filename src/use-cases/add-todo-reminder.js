import pushToTodoQueue from '../interface-adaptors/todo-queue';
import { createTodo } from '../interface-adaptors/daos/todo';

const addTodoReminder = async ({
	title,
	description,
	when,
	priority,
	isRepeating = false,
}) => {
	const todo = await createTodo({ title, description });
	await pushToTodoQueue({
		priority,
		time: when,
		isRepeating,
	});

	return todo;
};

export default addTodoReminder;
