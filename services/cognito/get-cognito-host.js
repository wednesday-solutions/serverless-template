/* eslint-disable func-names */
module.exports = function() {
	// eslint-disable-next-line no-console
	console.log({ STAGE: process.env.STAGE });
	if (process.env.STAGE === 'local') {
		return process.env.COGNITO_USER_POOL_ID;
	}
	return { Ref: 'CognitoUserPool' };
};
