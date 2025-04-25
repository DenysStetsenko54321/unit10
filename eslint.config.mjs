import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import eslintPluginPlaywright from 'eslint-plugin-playwright';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  {
    files: ['tests/**/*.ts'],
    plugins: {
      playwright: eslintPluginPlaywright,
    },
    rules: {
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
    },
  },
];
