import Joi from 'joi';

const createUserValidator = Joi.object({
	name: Joi.string().required(),
	uuid: Joi.string()
		.guid({
			version: ['uuidv4'],
		})
		.required(),
});

export default createUserValidator;
