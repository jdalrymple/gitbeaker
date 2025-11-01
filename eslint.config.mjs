import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jestExtended from 'eslint-plugin-jest-extended';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'reports/**',
      '.rpt2_cache/**',
      '.idea/**',
      '.DS_Store',
      'yarn-error.log',
      '.env',
      '.npmrc',
      'scripts/**',
      '.yarn/**',
      '.nx/**',
      '.husky/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        page: true,
        context: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      'jest-extended': jestExtended,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      ...prettierConfig.rules,

      // Import rules
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.config.ts', '**/scripts/*.[tj]s', '**/test/**/*.ts'],
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          json: 'always',
        },
      ],

      // TypeScript rules
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

      // General rules
      camelcase: 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      camelcase: 'off',
    },
  },
  {
    files: ['**/test/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'global-require': 'off',
      'jest/no-mocks-import': 'off',
      'jest/unbound-method': 'error',
      'max-classes-per-file': 'off',
    },
  },
  {
    files: ['**/__mocks__/**/*.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
