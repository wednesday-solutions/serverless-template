const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	mode: 'production',
	externals: [nodeExternals()],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.(tsx?)$/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		modules: ['node_modules', './'],
		alias: {
			'@utils': path.resolve(__dirname, 'utils/'),
			'@services': path.resolve(__dirname, 'services/'),
			'@mocks': path.resolve(__dirname, '__mocks__/'),
			'@aws': path.resolve(__dirname, 'aws/'),
			'@src': path.resolve(__dirname, 'src/'),
		},
		extensions: ['.js', '.ts', 'tsx'],
		mainFields: ['browser', 'jsnext:main', 'main'],
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
};
