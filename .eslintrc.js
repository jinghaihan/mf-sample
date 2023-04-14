module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  globals: {
    "$": 'readonly',
    "_": 'readonly',
    'moment': 'readonly'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    'no-trailing-spaces': 'off',
    'no-tabs': 'off',
    'template-curly-spacing': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
