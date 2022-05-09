module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:react/recommended', 'xo', 'xo-typescript', 'xo-react'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'tailwindcss'],
	rules: {
		'@typescript-eslint/comma-dangle': 'off',
		'react/jsx-tag-spacing': 'off',
		'tailwindcss/classnames-order': 'error',
		'tailwindcss/no-contradicting-classname': 'error',
	},
	ignorePatterns: ['**/*.js'],
};
