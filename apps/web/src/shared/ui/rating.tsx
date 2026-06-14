import { cn } from '@repo/ui'
import { Star } from 'lucide-react'

interface RatingProps {
  value: number | null
  count?: number | null
  className?: string
  showCount?: boolean
}

export function Rating({ value, count, className, showCount = true }: RatingProps) {
  if (value == null) return null
  const rounded = Math.round(value)
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="inline-flex" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn('h-3.5 w-3.5', i < rounded ? 'fill-clay text-clay' : 'text-stone')}
          />
        ))}
      </span>
      {showCount && count != null && <span className="text-xs text-muted">({count})</span>}
    </span>
  )
}
