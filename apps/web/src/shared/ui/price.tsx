import { cn } from '@repo/ui'

import { formatMoney } from '@/shared/lib/money'
import type { Money } from '@/shared/shopify'

interface PriceProps {
  price: Money
  compareAtPrice?: Money | null
  className?: string
}

export function Price({ price, compareAtPrice, className }: PriceProps) {
  const onSale = compareAtPrice != null && Number(compareAtPrice.amount) > Number(price.amount)
  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span className={cn(onSale && 'text-clay')}>{formatMoney(price)}</span>
      {onSale && (
        <span className="text-sm text-muted line-through">{formatMoney(compareAtPrice)}</span>
      )}
    </span>
  )
}
