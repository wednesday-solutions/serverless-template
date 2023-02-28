import get from 'lodash/get';

import LambdaBuilder from '@utils/lambda-builder';
import LambdaCloser from '@utils/lambda-closer';
import { addUserToGroup } from '@services/cognito/cognito';

const baseHandler = async (event, { logger }) => {
	try {
		if (event.triggerSource === 'PostConfirmation_ConfirmForgotPassword') {
			return event;
		}
		const { userName } = event;
		const { sub, email } = get(event, 'request.userAttributes');
		const group = get(event, 'request.userAttributes.custom:group');

		let response;
		switch (group) {
			case 'USER':
				logger.info({ sub, email });
				await addUserToGroup(userName, group);
				break;

			default:
				throw new Error('Invalid value for group');
		}
		logger.info(JSON.stringify(response));
		return event;
	} catch (err) {
		logger.error('error', err);
		return new LambdaCloser({
			message: err,
			code: 'E1',
		}).badRequest();
	}
};

const handler = LambdaBuilder(baseHandler)
	.buildBasicMiddlewares()
	.getLambdaHandler();

export { handler };
