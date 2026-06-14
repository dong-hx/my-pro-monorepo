import { describe, expect, it } from 'vitest'

import { isNavLinkActive } from './navigation'

describe('isNavLinkActive', () => {
  it('matches exact paths', () => {
    expect(isNavLinkActive('/collections/dogs', '/collections/dogs')).toBe(true)
    expect(isNavLinkActive('/about', '/about')).toBe(true)
  })

  it('ignores trailing slash differences', () => {
    expect(isNavLinkActive('/collections/all/', '/collections/all')).toBe(true)
  })

  it('does not match sibling collection routes', () => {
    expect(isNavLinkActive('/collections/dogs', '/collections/cats')).toBe(false)
    expect(isNavLinkActive('/collections/all', '/collections/dogs')).toBe(false)
  })

  it('highlights Shop All on the home page', () => {
    expect(isNavLinkActive('/', '/collections/all')).toBe(true)
    expect(isNavLinkActive('/', '/about')).toBe(false)
  })
})
