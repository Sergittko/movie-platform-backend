// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'commitlint.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // Sort imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Remove unused imports
      'unused-imports/no-unused-imports': 'error',
      // 'unused-imports/no-unused-vars': [
      //   'warn',
      //   {
      //     vars: 'all',
      //     varsIgnorePattern: '^_',
      //     args: 'after-used',
      //     argsIgnorePattern: '^_',
      //   },
      // ],

      // Import rules
      'import/no-duplicates': 'error',
      'import/newline-after-import': ['error', { count: 1 }],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',

      // Custom rules
      'no-console': 'warn',
      'no-param-reassign': 'off',
      'no-use-before-define': ['error', { variables: false }],
      'max-lines': ['error', { max: 500 }],
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',

      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);
