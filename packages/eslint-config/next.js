const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/next'),
    'eslint-config-turbo',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['only-warn', 'react', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    // "indent": ["error", 2],
    indent: 'off',
    quotes: 'off',
    // "comma-dangle": ["error", "always-multiline"],
    'comma-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-trailing-spaces': 'error',
    'jsx-quotes': ['error', 'prefer-double'],
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/prop-types': 'off',
    '@next/next/no-img-element': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/lib/**',
            group: 'external',
          },
          {
            pattern: '{types/*,@/types*,./types}',
            group: 'type',
          },
          {
            pattern:
              '{hooks,@/hooks/**/*,./hooks/**,./use**,../use**,../../use**,../../../use**,,../../hooks/**,./_hooks/**,../../../_hooks/**}',
            group: 'internal',
          },
          {
            pattern: '{utils/**/*,./utils,../utils,../../utils,../../../utils}',
            group: 'type',
          },
          {
            pattern: '{@/constants/*,./constants}',
            group: 'type',
          },
          {
            pattern:
              '{states/**/*,./states*,./**/states*,../states*,../../states*,../../../states*,,../../../../states*,**/**/**/states*}',
            group: 'type',
          },
          {
            pattern: '@/services/**',
            group: 'type',
          },
          {
            pattern: '{./helpers,./data,./config,./defaults,../../../defaults}',
            group: 'type',
          },
          {
            pattern:
              '{components,components/_common/**,@/components,@/components/**,svgs,@/assets/**/*,@/app/**,routes/**,public/**}',
            group: 'index',
          },
          {
            pattern: '{styles,./*.scss,../*.scss,../*.module.scss}',
            group: 'index',
          },
        ],
        groups: [
          ['external', 'builtin'],
          ['type', 'internal', 'object'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
  ],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};
