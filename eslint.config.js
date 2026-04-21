import { reactConfig } from '@repo/eslint-config/react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ⛔ 第一项必须是全局忽略（ESLint 9 规范）
  // 这样底层的 parser 就完全不会去扫描这些庞然大物，大幅提升性能
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/build/**',
      'pnpm-lock.yaml',
      // 仅含类型、无 src；在包内单独 lint，避免根配置 projectService 无法纳入该子工程
      'packages/type/**',
    ],
  },

  // 2. 注入 React 规则 (reactConfig 本身就是数组，直接展开)
  ...reactConfig,
  {
    name: 'repo/custom-overrides',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-console': 'error', // 比如根目录强制不许写 console
    },
  },
]
