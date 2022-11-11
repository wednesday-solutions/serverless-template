module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ['airbnb-base', 'prettier'],
	overrides: [
		{
			files: '*.test.js',
			rules: {
				'no-promise-executor-return': 'off',
				'global-require': 'off',
				'no-param-reassign': 'off',
				'no-shadow': 'off',
				'no-underscore-dangle': 'off',
				'no-undef': 'off',
				'consistent-return': 'off',
				'no-return-assign': 'off',
			},
		},
		{
			files: 'functions/**/index.js',
			rules: {
				'import/prefer-default-export': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			node: {},
			webpack: {
				config: 'webpack.config.js',
			},
		},
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
};
