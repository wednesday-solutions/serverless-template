import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

import TodoQueue from '../todo-queue';

const createTodo = async (event) => {
	try {
		const { title, description } = event?.body;

		const todo = {
			id: event.requestContext.requestId,
			title,
			description,
		};

		await new TodoQueue().enqueuTodo(todo);

		return new LambdaCloser({
			message: 'created',
			data: todo,
		}).ok();
	} catch (error) {
		console.error(error.message);
		return new LambdaCloser({ message: error.message }).error();
	}
};

export const handler = new LambdaBuilder(createTodo)
	.buildBasicMiddlewares()
	.getLambdaHandler();
