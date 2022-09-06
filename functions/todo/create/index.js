import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

import TodoQueue from '../todo-queue';

const createTodo = async (event, { logger }) => {
	const { title, description } = event.body;
	const todo = {
		id: event.requestContext.requestId,
		title,
		description,
	};

	const response = await new TodoQueue().enqueu(todo);
	logger.info(response);
	return new LambdaCloser({
		message: 'created',
		data: todo,
	}).ok();
};

export const handler = new LambdaBuilder(createTodo)
	.buildBasicMiddlewares()
	.getLambdaHandler();
