import { describe, expect, it } from 'vitest'

import { searchPath } from './search-path'

describe('searchPath', () => {
  it('builds query string for non-empty keywords', () => {
    expect(searchPath('dog treat')).toBe('/search?q=dog%20treat')
  })

  it('returns bare search route for empty input', () => {
    expect(searchPath('   ')).toBe('/search')
  })
})
