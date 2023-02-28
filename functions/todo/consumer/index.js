import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import TodoQueue from '../todo-queue';

const listTodos = async () => {
	const todos = await new TodoQueue().listTodos();
	return new LambdaCloser({
		data: todos,
		message: 'Fetched todos from the queue',
	}).ok();
};

export const handler = new LambdaBuilder(listTodos)
	.buildBasicMiddlewares()
	.getLambdaHandler();
