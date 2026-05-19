import { reactConfig } from '@repo/eslint-config/react'

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.turbo/**', '**/build/**'],
  },
  ...reactConfig,
  {
    name: 'admin/local-overrides',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },
]
