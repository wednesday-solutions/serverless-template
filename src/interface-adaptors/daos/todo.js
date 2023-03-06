/**
 * implement daos here, this file will import the model
 */

import { getModels } from '@src/drivers/models';

export const createTodo = async ({ uuid, title, description }) =>
	getModels().Todo.create({ uuid, title, description });

export const updateTodo = ({ uuid, title, description }) =>
	getModels().Todo.update({ title, description }, { where: { uuid } });

export const findAllTodos = () => getModels().Todo.findAll();

export const findByUuid = (uuid) =>
	getModels().Todo.findAll({ where: { uuid } });

export const deleteByUuid = (uuid) =>
	getModels().Todo.destroy({ where: { uuid } });
