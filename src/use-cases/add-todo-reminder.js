import TodoReminder from '../entities/todo-reminder';
import pushToTodoQueue from '../interface-adaptors/todo-queue';
import { createTodo } from '../interface-adaptors/daos/todo';
import Todo from '../entities/todos';

const addTodoReminder = ({
	title,
	description,
	when,
	priority,
	isRepeating = false,
}) => {
	const todoReminder = TodoReminder({
		priority,
		time: when,
		isRepeating,
	});
	const todo = Todo({ title, description });

	createTodo(todo);
	pushToTodoQueue(todoReminder);

	return todoReminder;
};

export default addTodoReminder;
