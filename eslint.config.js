import js from '@eslint/js';
import cypress from 'eslint-plugin-cypress';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules',
      'coverage',
      'build',
      'dist',
      '**/*.css',
      '**/*.scss',
      '**/*.ttf',
      '**/*.py',
      '**/*.svg',
      '**/*.html',
      '**/*.txt',
      '**/*.xml',
      'webpack.config.js',
      'vite.config.ts',
      'vitest.config.ts'
    ]
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  cypress.configs.recommended,
  prettierRecommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.commonjs }
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
      }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'consistent-return': 'warn',
      'import/no-cycle': 'off',
      'import/no-unresolved': 'off',
      'import/order': 'warn',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'linebreak-style': 'off',
      'no-console': 'warn',
      'no-restricted-imports': [
        'error',
        {
          name: 'prop-types',
          message: 'Please add TypeScript typings to props instead.'
        }
      ],
      'react/display-name': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/prop-types': 'off',
      'react/require-default-props': [
        'warn',
        { classes: 'ignore', functions: 'defaultArguments' }
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-shadow': 'error'
    }
  }
);