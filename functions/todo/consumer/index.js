import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import TodoQueue from '../todo-queue';

const createTodo = async () => {
	try {
		const todos = await new TodoQueue().listTodos();
		return new LambdaCloser({
			data: todos,
			message: 'Fetched todos from the queue',
		}).ok();
	} catch (error) {
		console.log(error.message);
		return new LambdaCloser({ message: error.message }).error();
	}
};

export const handler = new LambdaBuilder(createTodo)
	.buildBasicMiddlewares()
	.getLambdaHandler();
