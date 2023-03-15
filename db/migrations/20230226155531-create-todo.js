/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface
			.createTable('todos', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				uuid: {
					type: Sequelize.STRING(36),
					allowNull: false,
					references: { model: 'users', key: 'uuid' },
				},
				title: {
					type: Sequelize.STRING,
				},
				description: {
					type: Sequelize.STRING,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.fn('now'),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			})
			.then(() =>
				queryInterface.addConstraint('todos', {
					type: 'FOREIGN KEY',
					fields: ['uuid'],
					name: 'todo_user_fk',
					references: {
						table: 'users',
						field: 'uuid',
					},
				}),
			);
	},
	async down(queryInterface) {
		await queryInterface.dropTable('Todos');
	},
};
