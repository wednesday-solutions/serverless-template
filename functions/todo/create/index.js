import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { createTodo } from '@src/interface-adaptors/daos/todo';

// import TodoQueue from '../todo-queue';

const create = async (event, { logger }) => {
	const { title, description } = event.body;
	// const todo = {
	// 	id: event.requestContext.requestId,
	// 	title,
	// 	description,
	// };

	const newTodo = await createTodo({ title, description });

	// await new TodoQueue().enqueu(todo);
	logger.info(newTodo);
	return new LambdaCloser({
		message: 'created',
		data: newTodo,
	}).ok();
};

export const handler = new LambdaBuilder(create)
	.buildBasicMiddlewares()
	.getLambdaHandler();
