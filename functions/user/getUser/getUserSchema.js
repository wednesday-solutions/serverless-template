import Joi from 'joi';

const getUserValidator = Joi.object({
	uuid: Joi.string()
		.guid({
			version: ['uuidv4'],
		})
		.required(),
});

export default getUserValidator;
