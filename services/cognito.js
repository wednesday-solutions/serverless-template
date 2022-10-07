import {
	CognitoUserPool,
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

export async function getUserAttributes() {
	const cognitoUser = getUserPool().getCurrentUser();
	return new Promise((resolve, reject) => {
		cognitoUser.getSession((err, data) => {
			if (err) {
				return reject(err);
			}
			cognitoUser.getUserAttributes((err, data) => {
				if (err) {
					return reject(err);
				}
				resolve(data);
			});
		});
	});
}

// signUp the user
export function signUp(
	email,
	password,
	fullName,
	phone,
	isBusiness = false,
	owner,
	systemId
) {
	return new Promise((resolve, reject) => {
		const dataEmail = {
			Name: 'email',
			Value: email,
		};
		const attributeEmail = new CognitoUserAttribute(dataEmail);

		const dataGroup = {
			Name: 'custom:group',
			Value: owner ? 'group-owner' : 'group-vet',
		};
		const attributeGroup = new CognitoUserAttribute(dataGroup);

		const attributeList = [];
		attributeList.push(attributeEmail);
		attributeList.push(attributeGroup);
		attributeList.push(
			new CognitoUserAttribute({
				Name: 'custom:business',
				Value: isBusiness.toString(),
			})
		);
		attributeList.push(
			new CognitoUserAttribute({
				Name: 'given_name',
				Value: fullName,
			})
		);
		attributeList.push(
			new CognitoUserAttribute({
				Name: 'phone_number',
				Value: phone,
			})
		);
		attributeList.push(
			new CognitoUserAttribute({
				Name: 'custom:system_id',
				Value: systemId,
			})
		);

		getUserPool().signUp(email, password, attributeList, null, function(
			err,
			result
		) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

// confirmSignUp takes confirmation code and confirms the user
export function confirmSignUp(email, code) {
	return new Promise((resolve, reject) => {
		const pool = getUserPool();
		const userData = {
			Username: email,
			Pool: pool,
		};
		const curUser = new CognitoUser(userData);
		if (curUser === null) {
			const error = new Error({
				code: 'NotAuthorizedException',
				message: 'No user data is present',
				name: 'NotAuthorizedException',
			});
			reject(error);
		}
		curUser.confirmRegistration(code, true, function(err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

export function resendConfirmationCode(email) {
	return new Promise((resolve, reject) => {
		const pool = getUserPool();
		const userData = {
			Username: email,
			Pool: pool,
		};
		const curUser = new CognitoUser(userData);
		if (curUser === null) {
			const error = new Error({
				code: 'NotAuthorizedException',
				message: 'No user data is present',
				name: 'NotAuthorizedException',
			});
			reject(error);
		}

		curUser.resendConfirmationCode(function(err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

// login the user
export function login(email, password) {
	return new Promise((resolve, reject) => {
		const authenticationData = {
			Username: email,
			Password: password,
		};
		const authenticationDetails = new AuthenticationDetails(authenticationData);

		const userData = {
			Username: email,
			Pool: getUserPool(),
		};
		const cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function(result) {
				const accessToken = result.getAccessToken().getJwtToken();
				const refreshToken = result.getRefreshToken().token;
				const idToken = result.idToken.jwtToken;
				resolve({
					payload: {
						accessToken,
						refreshToken,
						idToken,
					},
				});
			},

			onFailure: function(err) {
				reject(err);
			},
		});
	});
}

// fetchAttributes establishes a session and gets the user Attributes.
export async function fetchAttributes() {
	const curUser = getUserPool().getCurrentUser();

	// fetchAttributes is called before login or signup
	if (curUser === null) {
		throw new Error({
			code: 'NotAuthorizedException',
			message: 'No user is logged in',
			name: 'NotAuthorizedException',
		});
	}

	const promisify = (callback) =>
		new Promise((resolve, reject) => callback(resolve, reject));

	// establish the session
	await promisify((resolve, reject) => {
		curUser.getSession(function(err, session) {
			if (err) {
				return reject(err);
			} else if (!session.isValid()) {
				const error = new Error('Session not Valid');
				return reject(error);
			}
			resolve();
		});
	});

	return promisify((resolve, reject) => {
		// get stored user data
		curUser.getUserAttributes(function(err, result) {
			if (err) {
				reject(err);
			}
			const attr = {};
			for (let i = 0; i < result.length; i++) {
				attr[result[i].getName()] = result[i].getValue();
			}
			resolve(attr);
		});
	});
}

// sign out the user and remove it from the userPool
export function signOut() {
	return new Promise((resolve, reject) => {
		const curUser = getUserPool().getCurrentUser();
		if (curUser === null) {
			resolve('No user was signed in');
		}

		const username = curUser.getUsername();
		curUser.signOut();
		resolve(`User: ${username} has been signed out`);
	});
}

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

export const getCognitoUser = () => {
	const cognitoUser = getUserPool().getCurrentUser();
	return new Promise((resolve, reject) => {
		cognitoUser.getSession((err, data) => {
			if (err) {
				return reject(err);
			}
			resolve(cognitoUser);
		});
	});
};
export default {
	COGNITO_ERROR_TYPES,
	getUserPoolAppClient,
	getUserPoolID,
	getUserPool,
	getUserAttributes,
	signOut,
	fetchAttributes,
	login,
	resendConfirmationCode,
	confirmSignUp,
	signUp,
};
