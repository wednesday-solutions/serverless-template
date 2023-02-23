import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { findByUuid } from '@src/interface-adaptors/daos/todo';

// import TodoQueue from '../todo-queue';
import getTodoValidator from './getTodoSchema';

const getTodo = async (event, { logger }) => {
	const { uuid } = event.queryStringParameters;
	try {
		const todoList = await findByUuid({ uuid });

		return new LambdaCloser({
			message: 'All todos for a user are',
			data: todoList,
		}).ok();
	} catch (error) {
		logger.info(error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(getTodo)
	.buildBasicMiddlewares(getTodoValidator)
	.getLambdaHandler();
