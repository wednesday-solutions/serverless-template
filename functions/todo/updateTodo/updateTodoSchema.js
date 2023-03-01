import Joi from 'joi';

const updateTodoValidator = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	uuid: Joi.string()
		.guid({
			version: ['uuidv4'],
		})
		.required(),
});

export default updateTodoValidator;
