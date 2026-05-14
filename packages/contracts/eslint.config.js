import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

/** 非 type-aware：避免依赖根目录 projectService 对子包 tsconfig 的发现 */
export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.d.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
]
