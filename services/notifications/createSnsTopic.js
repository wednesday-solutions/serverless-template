import { SNSClient, CreateTopicCommand } from '@aws-sdk/client-sns';

// create SNS service object instance
export const snsClient = new SNSClient({ region: process.env.REGION });

/**
 * @date 2022-08-22
 * @description This method will create a new SNS topic through which the notifications can be published
 * @param {string} topicName the name of the topic to create sns object
 * @returns {any}
 */
export const createSnsTopic = async (topicName) => {
	if (!topicName) return;

	const config = {
		/** input parameters for sns service configuration */

		Name: topicName, // TOPIC_NAME
	};
	try {
		const data = await snsClient.send(new CreateTopicCommand(config));
		console.log('Successfully created a new SNS topic', data);
	} catch (error) {
		console.error('Failed to create a new SNS topic!', { error });
	}
};
