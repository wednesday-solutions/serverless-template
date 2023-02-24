/**
 * implement daos here, this file will import the model
 */

import Todo from '@src/entities/todos';
import { getModels } from '@src/drivers/models';

export const createTodo = async ({ uuid, title, description }) =>
	getModels().Todo.create(Todo({ uuid, title, description }));

export const updateTodo = ({ title, description, id }) =>
	getModels().Todo.update(id, Todo({ title, description }));

export const findAllTodos = () => getModels().Todo.findAll();

export const findByUuid = (uuid) =>
	getModels().Todo.findAll({ where: { uuid } });
