import Joi from 'joi';

export const createTodoValidator = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
});
