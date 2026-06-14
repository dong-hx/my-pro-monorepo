import type { Money } from '@/shared/shopify'

/** 按币种格式化金额，禁止手拼 $。 */
export function formatMoney(money: Money, locale = 'en-US'): string {
  const amount = Number(money.amount)
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(Number.isFinite(amount) ? amount : 0)
}
