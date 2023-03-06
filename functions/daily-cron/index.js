import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

export const baseHandler = async (_, { logger }) => {
	const response = 'Hey from Daily cron!';
	logger.info(response);
	return new LambdaCloser({
		message: response,
	}).ok();
};

export const handler = new LambdaBuilder(baseHandler)
	.buildBasicMiddlewares()
	.getLambdaHandler();
