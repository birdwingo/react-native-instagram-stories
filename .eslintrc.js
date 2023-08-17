module.exports = {
	"root": true,
	"env": {
		"es2021": true,
		"node": true
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module",
		"project": ["./tsconfig.json"],
	},
	"plugins": [
	  "@typescript-eslint",
	  "import"
	],
	"extends": [
		"airbnb",
		"airbnb-typescript"
	],
	"rules": {
		// React
		"react/jsx-props-no-spreading": "off",
		"react/prop-types": "off",
		"react/function-component-definition": "off",

		// Spaces
		'semi': [
			'error',
			'always'
		],
		'no-trailing-spaces': [
			'error', {
				'ignoreComments': true
			}
		],
		'space-before-function-paren': [
			'error', {
				'anonymous': 'always',
				'named': 'never',
				'asyncArrow': 'always'
			}
		],
		'space-in-parens': [
			'error', 'always'
		],
		'space-before-blocks': 'error',
		'no-whitespace-before-property': 'error',
		'newline-before-return': 'error',
		'no-multi-spaces': 'error',
		'arrow-parens': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-spacing': 'error',
		'lines-between-class-members': [ 'error', 'always', { 'exceptAfterSingleLine': true } ],
		'@typescript-eslint/lines-between-class-members': [ 'error', 'always', { 'exceptAfterSingleLine': true } ],
		
		// Basics
		'camelcase': 'error',
		'no-var': 'error',
		'prefer-const': 'error',
		'eqeqeq': [ 'error', 'always' ],
		'no-return-assign': 'error',
		'no-return-await': 'error',
		'no-throw-literal': 'error',
		'new-cap': [ 'error', { 'newIsCap': true } ],
		'no-unneeded-ternary': 'error',
		'no-template-curly-in-string': 'error',
		'template-curly-spacing': 'error',
		'curly': [ 'error', 'all' ],
		'padded-blocks': [ 'error', 'always' ],
		'no-underscore-dangle': ["error", { "allowAfterThis": true }],
		'import/extensions':'off',
		'no-plusplus': 'off',
		'import/prefer-default-export': 'off',
		'no-mixed-operators': 'off',
		'no-param-reassign': 'off',
		'import/no-named-as-default': 'off',
		'import/no-extraneous-dependencies': 'off',
	}
};
