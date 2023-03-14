import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { deleteByUuid } from '@src/interface-adaptors/daos/todo';

import deleteTodoValidator from './deleteTodoSchema';

const deleteTodoHandler = async (event, { logger }) => {
	const { uuid } = event.body;
	try {
		const deleteTodoResponse = await deleteByUuid(uuid);
		return new LambdaCloser({
			message: 'deleted',
			data: deleteTodoResponse,
		}).ok();
	} catch (error) {
		logger.error(error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(deleteTodoHandler)
	.buildBasicMiddlewares(deleteTodoValidator)
	.getLambdaHandler();
