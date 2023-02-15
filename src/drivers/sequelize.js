import logger from '@utils/logger';
import Sequelize from 'sequelize';
import intialiseModels from './models';

let sequelize = null;

/**
 *
 * @link
 * https://sequelize.org/docs/v6/other-topics/aws-lambda/#tldr
 */

async function loadSequelize() {
	const sqlize = new Sequelize({
		database: process.env.DATABASE_NAME,
		password: process.env.PASSWORD,
		username: process.env.DATABASE_USERNAME,
		host: process.env.HOST,
		dialect: 'mysql',
		pool: {
			max: 2,
			min: 0,
			idle: 0,
			acquire: 3000,
			evict: 2900,
		},
	});

	await sqlize.authenticate();
	return sqlize;
}

export const connectToDatabase = async () => {
	try {
		if (!sequelize) {
			sequelize = await loadSequelize();
		} else {
			sequelize.connectionManager.initPools();

			if (
				Object.prototype.hasOwnProperty.call(
					sequelize.connectionManager,
					'getConnection'
				)
			) {
				delete sequelize.connectionManager.getConnection;
			}
		}
		intialiseModels(sequelize);
		return sequelize;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

export const closeDatabaseConnection = async () => {
	try {
		if (!sequelize) {
			logger.error('sequelize is not initialised');
		}
		sequelize.connectionManager.close();
	} catch (error) {
		logger.error(error);
	}
};
