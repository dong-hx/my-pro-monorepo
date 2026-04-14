import { describe, expect, it } from 'vitest'

import { loginSchema } from './login.schema'

describe('loginSchema', () => {
  it('accepts valid payload', () => {
    const parsed = loginSchema.parse({
      email: 'demo@company.com',
      password: '12345678',
    })

    expect(parsed.email).toBe('demo@company.com')
  })

  it('rejects invalid payload', () => {
    const result = loginSchema.safeParse({
      email: 'bad-email',
      password: '123',
    })

    expect(result.success).toBe(false)
  })
})
