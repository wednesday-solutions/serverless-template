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
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'warn',
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@src', './src'],
					['@aws', './aws'],
					['@utils', './utils'],
					['@services', './services'],
				],
			},
		},
	},
};
