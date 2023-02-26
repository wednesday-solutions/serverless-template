const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Todo, {
				as: 'userTodos',
				foreignKey: 'uuid',
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			uuid: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
