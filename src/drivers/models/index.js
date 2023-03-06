import todo from './todo';
import user from './user';

const Sequelize = require('sequelize');

let models;

const intialiseModels = (sequelize) => {
	const model = todo(sequelize, Sequelize.DataTypes);
	const userModel = user(sequelize, Sequelize.DataTypes);
	models = {};
	models[model.name] = model;
	models[userModel.name] = userModel;

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
