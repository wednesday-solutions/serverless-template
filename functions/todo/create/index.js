import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { createTodo } from '@src/interface-adaptors/daos/todo';

import createTodoValidator from './createTodoSchema';

const createTodoHandler = async (event, { logger }) => {
	const { title, description, uuid } = event.body;

	try {
		const newTodo = await createTodo({ uuid, title, description });
		return new LambdaCloser({
			message: 'created',
			data: newTodo,
		}).ok();
	} catch (error) {
		logger.error('error', error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(createTodoHandler)
	.buildBasicMiddlewares(createTodoValidator)
	.getLambdaHandler();
