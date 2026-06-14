import { reactConfig } from '@repo/eslint-config/react'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/dist/**',
      'src/shared/shopify/generated/**',
      'scripts/**',
    ],
  },
  ...reactConfig,
  {
    name: 'web/local-overrides',
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Next.js 路由文件需要导出 metadata/generateMetadata 等非组件成员
      'react-refresh/only-export-components': 'off',
      'no-console': 'off',
    },
  },
]
