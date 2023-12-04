module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:cypress/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', '.github'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/require-default-props': 'off',
  },
};
