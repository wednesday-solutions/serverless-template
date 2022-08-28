export const STANDARD_API_MESSAGES = {
	SUCCESS: 'Success',
	FAILURE: 'Error',
};

export const RESPONSE_SERIALIZER = [
	{
		regex: /^application\/json$/,
		serializer: ({ body }) => JSON.stringify(body),
	},
];
