import { describe, expect, it } from 'vitest'

import { newsletterSchema } from './newsletter.schema'

describe('newsletterSchema', () => {
  it('accepts valid email', () => {
    const result = newsletterSchema.safeParse({ email: 'user@example.com' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-email' })
    expect(result.success).toBe(false)
  })

  it('rejects honeypot field with content', () => {
    const result = newsletterSchema.safeParse({
      email: 'user@example.com',
      company: 'bot',
    })
    expect(result.success).toBe(false)
  })
})
