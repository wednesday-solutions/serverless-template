/**
 * implement daos here, this file will import the model
 */

import Todo from '@src/entities/todos';
import TodoModel from '../../drivers/models/todo';

export const createTodo = ({ title, description }) => {
	TodoModel.create(Todo({ title, description }));
};

export const updateTodo = ({ title, description, id }) => {
	TodoModel.update(id, Todo({ title, description }));
};

export const findAllTodos = () => {
	TodoModel.findAll();
};
