const { Model } = require('sequelize');

const initialiseTodo = (sequelize, DataTypes) => {
	class Todo extends Model {}
	Todo.init(
		{
			title: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Todo',
		}
	);
	return Todo;
};

export default initialiseTodo;
