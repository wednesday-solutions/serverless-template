/**
 * implement daos here, this file will import the model
 */

import Todo from '../1-entities/todos';
import TodoModel from '../4-drivers/todo-models';

export const createTodo = ({ title, description }) => {
	TodoModel.create(new Todo({ title, description }));
};

export const updateTodo = ({ title, description, id }) => {
	TodoModel.update(id, new Todo({ title, description }));
};
