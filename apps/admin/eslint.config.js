import { reactConfig } from '@repo/eslint-config/react'

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.turbo/**', '**/build/**'],
  },
  ...reactConfig,
  {
    name: 'admin/fsd-import-boundaries',
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/pages/*/*',
                '@/pages/*/*/*',
                '@/widgets/*/*',
                '@/widgets/*/*/*',
                '@/features/*/*/*',
                '@/features/*/*/*/*',
                '@/entities/*/*',
                '@/entities/*/*/*',
              ],
              message:
                '跨 slice 仅允许通过 public API 导入（例如 "@/features/auth/sign-in-by-password"）。',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'admin/local-overrides',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },
]
