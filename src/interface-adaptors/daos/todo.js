/**
 * implement daos here, this file will import the model
 */

import Todo from '@src/entities/todos';
import { getModels } from '@src/drivers/models/index';

export const createTodo = async ({ title, description }) =>
	getModels().Todo.create(Todo({ title, description }));

export const updateTodo = ({ title, description, id }) =>
	getModels().Todo.update(id, Todo({ title, description }));

export const findAllTodos = () => getModels().Todo.findAll();
