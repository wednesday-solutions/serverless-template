const { Model } = require('sequelize');

const initialiseTodo = (sequelize, DataTypes) => {
	class Todo extends Model {
		static associate(models) {
			Todo.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'uuid',
			});
		}
	}
	Todo.init(
		{
			uuid: DataTypes.STRING,
			title: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Todo',
		}
	);
	return Todo;
};

export default initialiseTodo;
