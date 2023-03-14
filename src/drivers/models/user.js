module.exports = (sequelize, Sequelize) => {
	class User extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Todo);
		}
	}
	User.init(
		{
			name: Sequelize.DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};
