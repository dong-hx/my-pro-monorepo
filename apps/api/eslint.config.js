import { baseConfig } from '@repo/eslint-config/base'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/build/**',
      'prisma.config.ts',
      'src/generated/**',
    ],
  },
  ...baseConfig,
  {
    name: 'api/spec-rules',
    files: ['**/*.spec.ts'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
  },
  {
    name: 'api/custom-overrides',
    files: ['**/*.ts'],
    rules: {
      // 与根目录保持一致：仓库默认不允许 console
      'no-console': 'error',
    },
  },
]
