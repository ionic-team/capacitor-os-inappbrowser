/*
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintparser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintjs from '@eslint/js';
*/

const tseslint = require('@typescript-eslint/eslint-plugin');
const tseslintparser = require('@typescript-eslint/parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintjs = require('@eslint/js');

module.exports = [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist/**/*', 'build/**/*', 'example-app/**/*'],
    languageOptions: {
      parser: tseslintparser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-types': 'error',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      'no-loss-of-precision': 'off',
      '@typescript-eslint/no-loss-of-precision': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      // https://eslint.org/docs/rules/
      'no-fallthrough': 'off', // https://github.com/ionic-team/eslint-config/issues/7
      'no-constant-condition': 'off',

      // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': ['warn', { allowArgumentsExplicitlyTypedAsAny: true }],
    },
  },
  eslintjs.configs.recommended,
  eslintPluginPrettierRecommended,
];
