import User from '@src/entities/user';
import { getModels } from '@src/drivers/models';

export const createUser = async ({ uuid, name }) =>
	getModels().User.create(User({ uuid, name }));

export const updateUser = async ({ uuid, name }) =>
	getModels().User.update(uuid, User({ name }));

export const findAllUsers = async () => getModels().User.findAll();

export const findUser = async (uuid) =>
	getModels().User.findOne({ where: { uuid } });
