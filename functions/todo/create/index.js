import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { createTodo } from '@src/interface-adaptors/daos/todo';

// import TodoQueue from '../todo-queue';
import createTodoValidator from './createTodoSchema';

const create = async (event, { logger }) => {
	const { title, description } = event.body;
	// const todo = {
	// 	id: event.requestContext.requestId,
	// 	title,
	// 	description,
	// };
	try {
		const newTodo = await createTodo({ title, description });
		// const response = await new TodoQueue().enqueu(todo);
		// logger.info(response);
		return new LambdaCloser({
			message: 'created',
			data: newTodo,
		}).ok();
	} catch (error) {
		logger.info(error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(create)
	.buildBasicMiddlewares(createTodoValidator)
	.getLambdaHandler();
