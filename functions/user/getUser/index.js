import { isEmpty } from 'lodash';

import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { findUser } from '@src/interface-adaptors/daos/user';

import getUserValidator from './getUserSchema';

export const getUser = async (event, { logger }) => {
	const { uuid } = event.queryStringParameters;
	try {
		const user = await findUser(uuid);
		if (isEmpty(user)) {
			return new LambdaCloser({
				code: 'E4',
			}).notFound();
		}

		return new LambdaCloser({
			message: 'user found',
			data: user,
		}).ok();
	} catch (error) {
		logger.error(error);
		return new LambdaCloser({
			code: 'E4',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(getUser)
	.buildBasicMiddlewares(getUserValidator)
	.getLambdaHandler();
