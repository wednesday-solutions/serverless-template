import { getModels } from '@src/drivers/models';

export const createUser = async ({ uuid, name }) =>
	getModels().User.create({ uuid, name });

export const updateUser = async ({ uuid, name }) =>
	getModels().User.update(uuid, { name });

export const findAllUsers = async () => getModels().User.findAll();

export const findUser = async (uuid) =>
	getModels().User.findOne({ where: { uuid } });
