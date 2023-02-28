/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import AWS from 'aws-sdk';

export const updateUserPassword = ({ username, password }) => {
	const cognito = new AWS.CognitoIdentityServiceProvider({
		region: process.env.REGION,
		apiVersion: '2016-04-18',
	});
	return cognito
		.adminSetUserPassword({
			Username: username,
			UserPoolId: process.env.COGNITO_USER_POOL_ID,
			Password: password,
			Permanent: true,
		})
		.promise();
};

export const addUserToGroup = async (username, groupName) => {
	console.log({ username, groupName });
	const cognito = new AWS.CognitoIdentityServiceProvider({
		region: process.env.REGION,
		apiVersion: '2016-04-18',
	});
	// eslint-disable-next-line no-return-await
	return await cognito
		.adminAddUserToGroup({
			GroupName: groupName,
			UserPoolId: process.env.COGNITO_USER_POOL_ID,
			Username: username,
		})
		.promise();
};
