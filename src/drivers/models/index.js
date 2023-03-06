import todo from './todo';

const Sequelize = require('sequelize');

let models;

const intialiseModels = (sequelize) => {
	const model = todo(sequelize, Sequelize.DataTypes);
	models = {};
	models[model.name] = model;

	Object.keys(models).forEach((modelName) => {
		if (models[modelName].associate) {
			models[modelName].associate(models);
		}
	});

	models.sequelize = sequelize;
	models.Sequelize = Sequelize;
	return models;
};

export const getModels = () => {
	if (!models) {
		throw new Error('models are not initialised');
	}
	return models;
};

export default intialiseModels;
