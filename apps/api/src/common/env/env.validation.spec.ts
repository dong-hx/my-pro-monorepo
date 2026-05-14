import 'reflect-metadata'

import { validateEnv } from './env.validation.js'

describe('validateEnv', () => {
  it('开发环境未设置 JWT_SECRET 时使用本地默认值', () => {
    const out = validateEnv({
      NODE_ENV: 'development',
      DATABASE_URL: 'postgresql://localhost:5432/x',
    })
    expect(out.JWT_SECRET).toBeDefined()
    expect(out.JWT_SECRET!.length).toBeGreaterThanOrEqual(16)
  })

  it('生产环境缺少 JWT_SECRET 时抛出明确错误', () => {
    expect(() =>
      validateEnv({
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://localhost:5432/x',
      }),
    ).toThrow(/生产环境必须在环境变量中设置 JWT_SECRET/)
  })

  it('JWT_SECRET 过短时抛出错误', () => {
    expect(() =>
      validateEnv({
        NODE_ENV: 'development',
        JWT_SECRET: 'too-short',
      }),
    ).toThrow(/minLength/)
  })
})
