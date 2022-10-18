/**
 *  only import use-cases into the 5th layer.
 */

import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

import create from '../2-use-cases/add-todo-reminder';

const createTodoReminder = async (event, { logger }) => {
	const { when, priority } = event.body;

	const response = create({ when, priority });
	logger.info(response);
	return new LambdaCloser({
		message: 'created',
	}).ok();
};

export const handler = new LambdaBuilder(createTodoReminder)
	.buildBasicMiddlewares()
	.getLambdaHandler();
