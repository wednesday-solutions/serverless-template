import { findAllTodos } from '../interface-adaptors/daos/todo';

const findAll = () => {
	const todos = findAllTodos();
	return todos.map((todo) => todo.toJSON());
};

export default findAll;
