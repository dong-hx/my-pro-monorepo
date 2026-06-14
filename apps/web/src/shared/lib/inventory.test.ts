import { describe, expect, it } from 'vitest'

import { isAtStockLimit, stockLimitMessage } from './inventory'

describe('inventory helpers', () => {
  it('returns stock messages for known limits', () => {
    expect(stockLimitMessage(1)).toBe('Only 1 left in stock')
    expect(stockLimitMessage(5)).toBe('Only 5 available in stock')
    expect(stockLimitMessage(0)).toBe('This item is out of stock')
    expect(stockLimitMessage(null)).toBeNull()
  })

  it('detects when quantity reached stock limit', () => {
    expect(isAtStockLimit(1, 1)).toBe(true)
    expect(isAtStockLimit(2, 5)).toBe(false)
    expect(isAtStockLimit(99, null)).toBe(false)
  })
})
