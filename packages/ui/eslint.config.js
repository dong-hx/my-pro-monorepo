import { reactConfig } from '@repo/eslint-config/react'

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.turbo/**', '**/build/**'],
  },
  ...reactConfig,
  {
    name: 'repo/ui-local',
    files: ['**/*.{ts,tsx}'],
    rules: {
      // 可以在这里针对 UI 包添加特殊规则
    },
  },
]
