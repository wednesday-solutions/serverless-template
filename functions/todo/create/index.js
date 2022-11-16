import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

import TodoQueue from '../todo-queue';
import { createTodoValidator } from './createTodoSchema';

const createTodo = async (event, { logger }) => {
	const { title, description } = event.body;
	const todo = {
		id: event.requestContext.requestId,
		title,
		description,
	};
	try {
		const response = await new TodoQueue().enqueu(todo);
		logger.info(response);
		return new LambdaCloser({
			message: 'created',
			data: todo,
		}).ok();
	} catch (error) {
		logger.info(error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(createTodo)
	.buildBasicMiddlewares(createTodoValidator)
	.getLambdaHandler();
