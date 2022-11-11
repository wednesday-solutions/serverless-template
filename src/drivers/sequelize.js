import logger from '@utils/logger';
import Sequelize from 'sequelize';

let sequelize = null;

/**
 *
 * @link
 * https://sequelize.org/docs/v6/other-topics/aws-lambda/#tldr
 */

async function loadSequelize() {
	const sqlize = new Sequelize({
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
	return sequelize;
};

export const closeDatabaseConnection = async () => {
	if (!sequelize) {
		logger.error('sequelize is not initialised');
	}
	sequelize.connectionManager.close();
};

export function getSequelize() {
	if (!sequelize) {
		logger.error('sequelize is not initialized');
	}
	return sequelize;
}
