import { createError } from '@middy/util';
import { isEmpty } from 'lodash';

import { transformToSnakeCase } from '@utils';

function handleValidationError(errorObj) {
	const error = createError(400, 'Bad Request', {});
	if (errorObj.message) {
		error.details = {
			message: errorObj.message,
		};
		throw error;
	}

	error.details = errorObj.error.details.map((detail) => ({
		message: detail.message,
		path: detail?.path,
	}));
	throw error;
}

export const schemaValidationMiddleware = (
	schema,
	body,
	entityToCheck = 'body'
) => {
	const isValidSchema = schema?.validate(transformToSnakeCase(body));
	if (
		!isEmpty(isValidSchema?.error) ||
		isValidSchema?.value === '' ||
		isEmpty(isValidSchema?.value)
	) {
		return {
			before: async (request) => {
				if (!isEmpty(request.event[entityToCheck])) {
					const schemaValidator = schema.validate(request.event[entityToCheck]);
					if (schemaValidator.error) {
						handleValidationError(schemaValidator);
					}
				}
			},
		};
	}
	return {};
};
