import { isEmpty } from 'lodash';
import { SubscribeCommand } from '@aws-sdk/client-sns';

import { CREATE_SUBSCRIPTION_CONSTANTS } from '@utils/constants/snsConstants';

import { snsClient } from './snsClient';

/**
 * @date 2022-08-28
 * @description This method is for creating a email protocol based subscription for a SNS Topic
 * @param {Object} params { email, topicArn } the email address to be subscribed and the topicArn of the SNS Topic
 * @returns {Object} if success, returns the success response from creating the subscription else will return an object with an error message associated to the key named error
 */
export const subscribeToEmail = async (params) => {
	if (isEmpty(params)) return {};

	if (!params?.email || !params.topicArn)
		return CREATE_SUBSCRIPTION_CONSTANTS.correctParamsRequiredMessage;

	const { email, topicArn } = params;

	try {
		const config = {
			Protocol: 'email',
			TopicArn: topicArn,
			Endpoint: email,
		};
		const data = await snsClient.send(new SubscribeCommand(config));
		console.log(
			`Successfuly created a new subscription to the email address ${email}`
		);
		return data;
	} catch (error) {
		console.error(`Failed to subscribe to email address: ${email}`, { error });
		return { error: error.message };
	}
};
