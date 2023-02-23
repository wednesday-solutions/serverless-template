const { Model } = require('sequelize');

const initialiseTodo = (sequelize, DataTypes) => {
	class Todo extends Model {}
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
