const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const Sequelize = require('sequelize');

const db = {};
const modelsPath = path.resolve(process.cwd(), 'src/drivers/models');

const intialiseModels = (sequelize) => {
	fs.readdirSync(modelsPath)
		.filter((file) => {
			return (
				file.indexOf('.') !== 0 &&
				file !== basename &&
				file.slice(-3) === '.js' &&
				file.indexOf('.test.js') === -1
			);
		})
		.forEach((file) => {
			// eslint-disable-next-line import/no-dynamic-require, global-require
			const model = require(path.join(modelsPath, file))(sequelize, Sequelize);
			db[model.name] = model;
		});

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	return db;
};

export const getModels = () => {
	if (!db.sequelize) {
		throw new Error('models are not initialised');
	}
	return db;
};

export default intialiseModels;
