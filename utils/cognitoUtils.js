import { CognitoUserPool } from 'amazon-cognito-identity-js';

let userPool;
export function getUserPool() {
	if (!userPool) {
		const poolData = {
			UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
			ClientId: process.env.AWS_COGNITO_USER_POOL_APP_CLIENT,
		};
		userPool = new CognitoUserPool(poolData);
	}
	return userPool;
}

export function getUserPoolID() {
	return process.env.AWS_COGNITO_USER_POOL_ID;
}

export function getUserPoolAppClient() {
	return process.env.AWS_COGNITO_USER_POOL_APP_CLIENT;
}

export const COGNITO_ERROR_TYPES = {
	USER_NOT_CONFIRMED_EXCEPTION: 'UserNotConfirmedException',
	NOT_AUTHORIZED: 'NotAuthorizedException',
	INVALID_PARAMETER_EXCEPTION: 'InvalidParameterException',
	CODE_MISMATCH_EXCEPTION: 'CodeMismatchException',
	USER_NOT_FOUND_EXCEPTION: 'UserNotFoundException',
};
