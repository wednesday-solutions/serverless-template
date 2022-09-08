import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';

const baseHandler = async (event, { logger }) => {
	const response = 'Hey Lambda !';
	return new LambdaCloser({
		message: response,
	}).ok();
};

export const handler = new LambdaBuilder(baseHandler)
	.buildBasicMiddlewares()
	.getLambdaHandler();
