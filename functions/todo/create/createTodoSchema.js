import Joi from 'joi';

const createTodoValidator = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
});

export default createTodoValidator;
