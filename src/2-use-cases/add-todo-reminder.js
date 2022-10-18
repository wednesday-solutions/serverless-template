/**
 * these are functions that will implement a use case.
 * in this case create a reminder for a todo.
 *
 * create a new todo-reminder entity, push a message into a message broker
 *
 */

import TodoReminder from '../1-entities/todo-reminder';
import pushToTodoQueue from '../3-interface-adaptors/todo-queue';
import { createTodo } from '../3-interface-adaptors/todo-daos';

const addTodoReminder = ({ when, priority }) => {
	const todoReminder = new TodoReminder({
		priority,
		time: when,
		isRepeating: false,
	});
	pushToTodoQueue(todoReminder);
	createTodo(todoReminder);
};

export default addTodoReminder;
