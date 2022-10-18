/**
 * this file will receive the dao object, use it to findAll todos
 */

import Todo from '../1-entities/todos';

const findAllTodos = (todoDao) => {
	const todos = todoDao.findAll();
	return todos.map((todo) => new Todo(todo));
};

export default findAllTodos;
