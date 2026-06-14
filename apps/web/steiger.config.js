import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // 项目演进期，避免小 slice 噪音。
      'fsd/insignificant-slice': 'off',
      // 同 slice 相对导入，跨 slice/layer 绝对导入。
      'fsd/import-locality': 'error',
    },
  },
  {
    // Next.js 路由目录不是 FSD 切片，排除以避免误报。
    ignores: ['./src/app/**', './src/shared/shopify/generated/**'],
  },
  {
    files: ['./src/shared/assets/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
])
