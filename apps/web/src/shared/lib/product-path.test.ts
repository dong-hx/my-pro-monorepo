import { describe, expect, it } from 'vitest'

import { collectionPath, productPath } from './product-path'

describe('productPath', () => {
  it('encodes non-ASCII handles', () => {
    expect(productPath('宠物梳子')).toBe('/products/%E5%AE%A0%E7%89%A9%E6%A2%B3%E5%AD%90')
  })

  it('leaves ASCII handles readable', () => {
    expect(productPath('dog-treat')).toBe('/products/dog-treat')
  })
})

describe('collectionPath', () => {
  it('encodes handles', () => {
    expect(collectionPath('all')).toBe('/collections/all')
  })
})
