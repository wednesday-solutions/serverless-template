import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { deleteByUuid } from '@src/interface-adaptors/daos/todo';

import deleteTodoValidator from './deleteTodoSchema';

const create = async (event, { logger }) => {
	const { uuid } = event.body;
	try {
		const deleteTodo = await deleteByUuid(uuid);
		return new LambdaCloser({
			message: 'deleted',
			data: deleteTodo,
		}).ok();
	} catch (error) {
		logger.error('error', error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(create)
	.buildBasicMiddlewares(deleteTodoValidator)
	.getLambdaHandler();
