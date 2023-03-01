import Joi from 'joi';

const deleteTodoValidator = Joi.object({
	uuid: Joi.string()
		.guid({
			version: ['uuidv4'],
		})
		.required(),
});

export default deleteTodoValidator;
