import { EMAIL_CHARSET as Charset } from '@utils/constants/sesConstants';

export const formatEmailMessage = ({ message, subject }) => ({
	Body: {
		Text: {
			Charset,
			Data: message,
		},
	},
	Subject: {
		Charset,
		Data: subject,
	},
});
