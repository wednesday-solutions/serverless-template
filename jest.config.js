module.exports = {
	collectCoverageFrom: [
		'./**/*.js',
		'!babel.config.js',
		'!.eslintrc.js',
		'!jest.config.js',
		'!utils/*',
		'!webpack.config.js',
		'!coverage/**/*.js',
		'!.webpack/**/*.*',
	],
	coverageThreshold: {
		global: {
			statements: 50,
			branches: 50,
			functions: 50,
			lines: 50,
			// TODO: once the codebase will become more structurized, we should increase the above threshold
		},
	},
	moduleNameMapper: {
		'@(utils|services|functions)(.*)$': '<rootDir>/$1/$2/',
	},
};
