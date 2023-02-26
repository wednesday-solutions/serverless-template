import Todo from '@src/entities/todos';
import { getModels } from '@src/drivers/models';

export const createUser = async ({ uuid, name }) =>
	await getModels().User.create(Todo({ uuid, name }));

export const updateUser = async ({ uuid, name }) =>
	await getModels().Todo.update(uuid, Todo({ name }));

export const findAllUsers = async () => await getModels().User.findAll();

export const findUser = async (uuid) =>
	await getModels().User.findAll({ where: { uuid } });
