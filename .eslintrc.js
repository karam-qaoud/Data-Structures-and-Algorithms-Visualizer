/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const restrictedGlobals = require('confusing-browser-globals');

const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['plugin:react-hooks/recommended', 'prettier'],

  globals: {
    JSX: true,
    __DEV__: true,
  },

  overrides: [
    {
      files: [
        'packages/*/src/**/*.js',
        'packages/*/__tests__/**/*.?(m)js',
        'packages/*/src/**/*.jsx',
      ],
      parser: 'babel-eslint',
      parserOptions: {
        allowImportExportEverywhere: true,
        sourceType: 'module',
      },
      rules: {
        'no-var': ERROR,
        'prefer-const': ERROR,
        strict: OFF,
      },
    },
    {
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': OFF,
      },
    },
    {
      env: {
        browser: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
      plugins: ['react', '@typescript-eslint', 'header'],
      rules: {
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/no-this-alias': OFF,
        '@typescript-eslint/no-unused-vars': [ERROR, { args: 'none' }],
        'header/header': [2, 'scripts/www/headerTemplate.js'],
      },
    },
    {
      files: ['packages/**/src/index.ts'],
      rules: {
        'header/header': OFF,
      },
    },
  ],

  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 8,
    sourceType: 'script',
  },

  plugins: [
    'sort-keys-fix',
    'simple-import-sort',
    'header',
    'import',
    'jest',
    'no-function-declare-after-return',
    'react',
    'no-only-tests',
  ],

  root: true,
  rules: {
    'accessor-pairs': OFF,

    'brace-style': [ERROR, '1tbs'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    'dot-notation': [ERROR, { allowPattern: '^(error|warn)$' }],

    'eol-last': ERROR,
    eqeqeq: [ERROR, 'allow-null'],
    'flowtype/object-type-delimiter': OFF,

    'flowtype/sort-keys': ERROR,

    'header/header': [2, 'scripts/www/headerTemplate.js'],

    'import/first': ERROR,

    'import/newline-after-import': ERROR,

    'import/no-duplicates': ERROR,

    indent: OFF,

    'jsx-quotes': [ERROR, 'prefer-double'],

    'keyword-spacing': [ERROR, { after: true, before: true }],

    'max-len': OFF,

    'no-bitwise': OFF,

    'no-console': ERROR,

    'no-debugger': ERROR,

    'no-function-declare-after-return/no-function-declare-after-return': ERROR,

    'no-inner-declarations': [ERROR, 'functions'],

    'no-multi-spaces': ERROR,

    'no-only-tests/no-only-tests': ERROR,

    'no-restricted-globals': [ERROR].concat(restrictedGlobals),

    'no-restricted-syntax': [ERROR, 'WithStatement'],

    'no-shadow': ERROR,

    'no-unused-expressions': ERROR,

    'no-unused-vars': [ERROR, { args: 'none' }],

    'no-use-before-define': OFF,

    'no-useless-computed-key': OFF,

    'no-useless-concat': OFF,

    'no-var': ERROR,

    quotes: [
      ERROR,
      'single',
      { allowTemplateLiterals: true, avoidEscape: true },
    ],

    'react/jsx-boolean-value': [ERROR, 'always'],

    'react/jsx-no-undef': ERROR,

    'react/jsx-sort-prop-types': OFF,

    'react/jsx-tag-spacing': ERROR,

    'react/jsx-uses-react': ERROR,

    'react/jsx-wrap-multilines': [
      ERROR,
      { assignment: false, declaration: false },
    ],

    'react/no-is-mounted': OFF,

    'react/react-in-jsx-scope': ERROR,

    'react/self-closing-comp': ERROR,

    'simple-import-sort/exports': ERROR,

    'simple-import-sort/imports': [
      ERROR,
      {
        groups: [['^.*\\u0000$'], ['^\\u0000'], ['^@?\\w'], ['^'], ['^\\.']],
      },
    ],

    'sort-keys-fix/sort-keys-fix': ERROR,

    'space-before-blocks': ERROR,

    'space-before-function-paren': OFF,

    strict: ERROR,

    'valid-typeof': [ERROR, { requireStringLiterals: true }],
  },
};
