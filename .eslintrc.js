module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true
      }
    ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  plugins: ['vue', 'prettier'],

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/prettier',
    'eslint:recommended'
  ]
};
