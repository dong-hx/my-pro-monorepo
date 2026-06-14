import { describe, expect, it } from 'vitest'

import { mapProductCard } from './mappers'

describe('mapProductCard', () => {
  it('maps price and strips zero compare-at', () => {
    const card = mapProductCard({
      id: 'gid://shopify/Product/1',
      handle: 'test-bed',
      title: 'Organic Bed',
      productType: 'Bedding',
      tags: ['Bestseller'],
      availableForSale: true,
      featuredImage: null,
      priceRange: { minVariantPrice: { amount: '49.00', currencyCode: 'USD' } },
      compareAtPriceRange: { minVariantPrice: { amount: '0.0', currencyCode: 'USD' } },
      rating: { value: '4.5' },
      ratingCount: { value: '12' },
    })

    expect(card.price.amount).toBe('49.00')
    expect(card.compareAtPrice).toBeNull()
    expect(card.rating).toBe(4.5)
    expect(card.ratingCount).toBe(12)
  })

  it('keeps non-zero compare-at price', () => {
    const card = mapProductCard({
      id: 'gid://shopify/Product/2',
      handle: 'sale-item',
      title: 'Sale Item',
      productType: 'Food',
      tags: [],
      availableForSale: true,
      featuredImage: null,
      priceRange: { minVariantPrice: { amount: '20.00', currencyCode: 'USD' } },
      compareAtPriceRange: { minVariantPrice: { amount: '25.00', currencyCode: 'USD' } },
      rating: null,
      ratingCount: null,
    })

    expect(card.compareAtPrice?.amount).toBe('25.00')
    expect(card.rating).toBeNull()
  })
})
