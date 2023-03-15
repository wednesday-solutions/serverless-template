import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { createUser } from '@src/interface-adaptors/daos/user';

import createUserValidator from './createUserSchema';

export const create = async (event, { logger }) => {
	const { uuid, name } = event.body;
	try {
		const newUser = await createUser({ uuid, name });

		return new LambdaCloser({
			message: 'User Created',
			data: newUser,
		}).ok();
	} catch (error) {
		logger.error(error);
		return new LambdaCloser({
			code: 'E5',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(create)
	.buildBasicMiddlewares(createUserValidator)
	.getLambdaHandler();
