import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { updateTodo } from '@src/interface-adaptors/daos/todo';

import updateTodoValidator from './updateTodoSchema';

const updateHandler = async (event, { logger }) => {
	const { title, description, uuid } = event.body;
	try {
		const updatedTodoResponse = await updateTodo({ uuid, title, description });
		return new LambdaCloser({
			message: 'updated',
			data: updatedTodoResponse,
		}).ok();
	} catch (error) {
		logger.error(error);
		return new LambdaCloser({
			code: 'E1',
		}).badRequest();
	}
};

export const handler = new LambdaBuilder(updateHandler)
	.buildBasicMiddlewares(updateTodoValidator)
	.getLambdaHandler();
