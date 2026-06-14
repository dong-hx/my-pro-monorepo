import { describe, expect, it } from 'vitest'

import { isShopifyCdnUrl, normalizeImageUrl } from './image-url'

describe('normalizeImageUrl', () => {
  it('adds https protocol to protocol-relative URLs', () => {
    expect(normalizeImageUrl('//cdn.shopify.com/s/files/1/a.jpg')).toBe(
      'https://cdn.shopify.com/s/files/1/a.jpg',
    )
  })

  it('returns absolute URLs unchanged', () => {
    const url = 'https://cdn.shopify.com/s/files/1/a.jpg'
    expect(normalizeImageUrl(url)).toBe(url)
  })
})

describe('isShopifyCdnUrl', () => {
  it('detects cdn.shopify.com', () => {
    expect(isShopifyCdnUrl('https://cdn.shopify.com/s/files/1/a.jpg')).toBe(true)
  })

  it('returns false for local paths', () => {
    expect(isShopifyCdnUrl('/images/home/hero.jpg')).toBe(false)
  })
})
