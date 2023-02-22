import isEmpty from 'lodash/isEmpty';
import { SendEmailCommand } from '@aws-sdk/client-ses';

import {
	EMAIL_CHARSET as Charset,
	CREATE_REMINDER_CONSTANTS,
	EMAIL_SSM_NAMES,
} from '@utils/constants/sesConstants';

import { sesClient } from './sesClient';
import { getParamsFromSSM } from '../parameterStore/ssmHelpers';

const {
	correctEmailsRequiredMessage,
	emptyParamsPassedErrorMessage,
	correctParamsRequiredMessage,
} = CREATE_REMINDER_CONSTANTS;

export function formatEmailBody({ message, isHtmlMessage = false }) {
	if (isHtmlMessage) {
		return {
			Html: {
				Charset,
				Data: message,
			},
		};
	}
	return {
		Text: {
			Charset,
			Data: message,
		},
	};
}

export function formatEmailContent({
	message,
	subject,
	isHtmlMessage = false,
}) {
	return {
		Body: formatEmailBody({ message, isHtmlMessage }),
		Subject: {
			Charset,
			Data: subject,
		},
	};
}

export async function sendEmail(params) {
	if (isEmpty(params)) return { error: emptyParamsPassedErrorMessage };

	if (!params?.message || !params?.subject)
		return { error: correctParamsRequiredMessage };

	const { message, subject, isHtmlMessage } = params;

	// get emails from aws parameter store
	const emailsFromSSM = await getParamsFromSSM(
		EMAIL_SSM_NAMES,
		correctEmailsRequiredMessage
	);
	if (emailsFromSSM.error) return { error: emailsFromSSM.error };
	const emails = emailsFromSSM.data.map((emailObj) => emailObj.value);

	try {
		const formattedEmailMessage = formatEmailContent({
			message,
			subject,
			isHtmlMessage,
		});
		const parameters = {
			Destination: {
				ToAddresses: [emails[0]],
			},
			ReplyToAddresses: [],
			Source: emails[1],
			Message: formattedEmailMessage,
		};

		const sendReminderResponse = await sesClient.send(
			new SendEmailCommand(parameters)
		);
		return { data: { messageId: sendReminderResponse.MessageId } };
	} catch (error) {
		return { error: error.message };
	}
}
