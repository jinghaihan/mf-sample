module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  globals: {},
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    'no-trailing-spaces': 'off',
    'no-tabs': 'off',
    'template-curly-spacing': 'off',
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
