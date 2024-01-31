/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:svelte/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    project: true,
    tsconfigRootDir: './',
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'import/no-mutable-exports': 'off', // to dismiss `export let prop = 'default'` warning
    'no-labels': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'ForOfStatement',
      'WithStatement'
    ] // remove LabeledStatement from the list
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
