module.exports = (sequelize, Sequelize) => {
	class User extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Todo, {
				as: 'userTodos',
				foreignKey: 'uuid',
			});
		}
	}
	User.init(
		{
			name: Sequelize.DataTypes.STRING,
			uuid: Sequelize.DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};
