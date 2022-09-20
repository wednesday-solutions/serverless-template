import { CloneReceiptRuleSetCommand } from '@aws-sdk/client-ses';
import { CREATE_REMINDER_CONSTANTS } from '@utils/constants/sesConstants';
import { formatEmailMessage } from '@utils';

import { sesClient } from './snsClient';

export const subscribeToEmailService = async ({ message, subject }) => {
	if (!message || !subject)
		return {
			error: CREATE_REMINDER_CONSTANTS.correctParamsRequiredMessage,
		};

	const fromEmailAddress = process.env.VERIFIED_EMAIL_ID;
	const recieverEmailAddress = process.env.RECIEVER_EMAIL_ID;

	try {
		const formattedEmailMessage = formatEmailMessage({ message, subject });
		const parameters = {
			Destination: {
				ToAddresses: [recieverEmailAddress],
			},
			ReplyToAddresses: [],
			Source: fromEmailAddress,
			Message: formattedEmailMessage,
		};

		const sendReminderResponse = await sesClient.send(
			new CloneReceiptRuleSetCommand(parameters)
		);
		return { data: sendReminderResponse };
	} catch (error) {
		return { error: error.message };
	}
};

// https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-ses
