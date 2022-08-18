export const STANDARD_API_MESSAGES = {
	SUCCESS: 'Success',
	FAILURE: 'Error',
};

export const STATUS_CODES = {
	ok: 200,
	created: 201,
	badRequest: 400,
	forbidden: 403,
	notFound: 404,
	error: 500,
};

export const RESPONSE_SERIALIZER = [
	{
		regex: /^application\/json$/,
		serializer: ({ body }) => JSON.stringify(body),
	},
];
