import { describe, expect, it } from 'vitest'

import { searchQuerySchema } from './search.schema'

describe('searchQuerySchema', () => {
  it('accepts trimmed keywords', () => {
    expect(searchQuerySchema.parse('  dog bed  ')).toBe('dog bed')
  })

  it('rejects empty queries', () => {
    expect(searchQuerySchema.safeParse('   ').success).toBe(false)
  })
})
