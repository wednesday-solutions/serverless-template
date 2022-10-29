export const CREATE_REMINDER_CONSTANTS = {
	correctParamsRequiredMessage:
		'Please pass valid params ({message, subject}) to send reminders',
	correctEmailsRequiredMessage:
		'Please pass the correct "from" and "to" email addresses to send reminders',
};

export const EMAIL_CHARSET = 'UTF-8';

export const EMAIL_SSM_NAMES = ['/ses/todo-to-email', '/ses/todo-from-email'];
