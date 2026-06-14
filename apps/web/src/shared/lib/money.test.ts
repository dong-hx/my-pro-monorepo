import { describe, expect, it } from 'vitest'

import { formatMoney } from './money'

describe('formatMoney', () => {
  it('formats USD with narrow symbol', () => {
    const result = formatMoney({ amount: '29.99', currencyCode: 'USD' })
    expect(result).toMatch(/29\.99/)
    expect(result).toMatch(/\$/)
  })

  it('returns zero for invalid amount', () => {
    const result = formatMoney({ amount: 'not-a-number', currencyCode: 'USD' })
    expect(result).toMatch(/0/)
  })
})
