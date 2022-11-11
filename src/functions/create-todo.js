/**
 *  only import use-cases into the 5th layer.
 */

import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

import create from '../use-cases/add-todo-reminder';

const createTodoReminder = async (event, { logger }) => {
	const { when, priority } = event.body;

	const response = create({ when, priority });
	logger.info(response);

	return new LambdaCloser({
		message: 'created',
	}).ok();
};

// eslint-disable-next-line import/prefer-default-export
export const handler = new LambdaBuilder(createTodoReminder)
	.buildBasicMiddlewares()
	.getLambdaHandler();
