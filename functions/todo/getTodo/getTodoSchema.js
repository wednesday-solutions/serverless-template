import Joi from 'joi';

const getTodoValidator = Joi.object({
	uuid: Joi.string()
		.guid({
			version: ['uuidv4'],
		})
		.required(),
});

export default getTodoValidator;
