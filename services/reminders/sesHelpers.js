import { CloneReceiptRuleSetCommand } from '@aws-sdk/client-ses';
import {
	CREATE_REMINDER_CONSTANTS,
	EMAIL_SSM_NAMES,
} from '@utils/constants/sesConstants';
import { formatEmailMessage } from '@utils';

import { sesClient } from './sesClient';
import { getParamsFromSSM } from '../ssm/ssmClient';

export const subscribeToEmailService = async ({ message, subject }) => {
	if (!message || !subject)
		throw new Error(CREATE_REMINDER_CONSTANTS.correctParamsRequiredMessage);

	const emailsFromSSM = await getParamsFromSSM(EMAIL_SSM_NAMES);

	if (emailsFromSSM.error)
		throw new Error(CREATE_REMINDER_CONSTANTS.correctParamsRequiredMessage);

	const emails = emailsFromSSM.data.map((emailObj) => emailObj.value);
	try {
		const formattedEmailMessage = formatEmailMessage({ message, subject });
		const parameters = {
			Destination: {
				ToAddresses: [emails[0]],
			},
			ReplyToAddresses: [],
			Source: emails[1],
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
