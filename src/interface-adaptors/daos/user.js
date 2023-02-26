import Todo from '@src/entities/todos';
import { getModels } from '@src/drivers/models';

export const createUser = async ({ uuid, name }) =>
	getModels().User.create(Todo({ uuid, name }));

export const updateUser = async ({ uuid, name }) =>
	getModels().Todo.update(uuid, Todo({ name }));

export const findAllUsers = async () => getModels().User.findAll();

export const findUser = async (uuid) =>
	getModels().User.findAll({ where: { uuid } });
