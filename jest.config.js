module.exports = {
	collectCoverageFrom: [
		'./**/*.js',
		'!babel.config.js',
		'!.eslintrc.js',
		'!jest.config.js',
		'!webpack.config.js',
		'!coverage/**/*.js',
		'!.webpack/**/*.*',
	],
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	moduleNameMapper: {
		'@(utils|services|functions)(.*)$': '<rootDir>/$1/$2/',
	},
};
