/**
 * implement daos here, this file will import the model
 */

import Todo from '@src/entities/todos';
import { getModels } from '@src/drivers/models';

export const createTodo = async ({ uuid, title, description }) =>
	getModels().Todo.create(Todo({ uuid, title, description }));

export const updateTodo = ({ uuid, title, description }) =>
	getModels().Todo.update(Todo({ title, description }), { where: { uuid } });

export const findAllTodos = () => getModels().Todo.findAll();

export const findByUuid = (uuid) =>
	getModels().Todo.findAll({ where: { uuid } });

export const deleteByUuid = (uuid) =>
	getModels().Todo.destroy({ where: { uuid } });
