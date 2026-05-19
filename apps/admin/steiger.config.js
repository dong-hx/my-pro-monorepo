import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // Admin 项目仍在演进期，避免该规则对小 slice 造成持续噪音。
      'fsd/insignificant-slice': 'off',
      // 同 slice 必须相对导入，跨 slice/layer 必须绝对导入。
      'fsd/import-locality': 'error',
    },
  },
  {
    ignores: ['./src/test/**', './src/vite-env.d.ts'],
  },
  {
    files: ['./src/app/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
  {
    files: ['./src/shared/assets/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
])
