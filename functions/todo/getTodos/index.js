import { isEmpty } from 'lodash';
import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { findByUuid } from '@src/interface-adaptors/daos/todo';

// import TodoQueue from '../todo-queue';
import getTodoValidator from './getTodoSchema';

const getTodos = async (event, { logger }) => {
	const { uuid } = event.queryStringParameters;
	try {
		const todoList = await findByUuid(uuid);
		if (isEmpty(todoList)) {
			return new LambdaCloser({
				code: 'E4',
			}).notFound();
		}

		return new LambdaCloser({
			message: 'All todos for a user are',
			data: todoList,
		}).ok();
	} catch (error) {
		logger.error('error', error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(getTodos)
	.buildBasicMiddlewares(getTodoValidator)
	.getLambdaHandler();
