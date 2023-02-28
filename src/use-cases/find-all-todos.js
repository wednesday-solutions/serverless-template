import Todo from '../entities/todos';
import { findAllTodos } from '../interface-adaptors/daos/todo';

const findAll = () => {
	const todos = findAllTodos();
	return todos.map((todo) => Todo(todo));
};

export default findAll;
