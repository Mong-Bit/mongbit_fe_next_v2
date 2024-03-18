/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@mongbit/eslint-config/react-internal.js', '@monbit/ui/config.lint.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
  },
};
