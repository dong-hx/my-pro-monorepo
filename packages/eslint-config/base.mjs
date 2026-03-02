import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export const baseConfig = [
  // 1. 继承核心推荐规则
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 2. 语言与环境变量配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true, // 开启 V8 极速模式
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 3. 🛡️ 永远把 Prettier 放在数组最后！
  // 它的作用是强行关闭所有和 Prettier 冲突的 ESLint 格式化规则
  prettierConfig,
]
