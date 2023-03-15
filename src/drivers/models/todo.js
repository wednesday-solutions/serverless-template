module.exports = (sequelize, Sequelize) => {
	class Todo extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Todo.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'uuid',
			});
		}
	}
	Todo.init(
		{
			uuid: Sequelize.DataTypes.STRING,
			title: Sequelize.DataTypes.STRING,
			description: Sequelize.DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Todo',
		},
	);
	return Todo;
};
