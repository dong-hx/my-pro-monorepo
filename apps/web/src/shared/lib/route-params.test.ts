import { describe, expect, it } from 'vitest'

import { decodeRouteParam } from './route-params'

describe('decodeRouteParam', () => {
  it('decodes percent-encoded non-ASCII handles', () => {
    expect(decodeRouteParam('%E5%AE%A0%E7%89%A9%E6%A2%B3%E5%AD%90')).toBe('宠物梳子')
  })

  it('leaves ASCII handles unchanged', () => {
    expect(decodeRouteParam('dogs')).toBe('dogs')
  })

  it('returns original value on invalid encoding', () => {
    expect(decodeRouteParam('%E0%A4%A')).toBe('%E0%A4%A')
  })
})
