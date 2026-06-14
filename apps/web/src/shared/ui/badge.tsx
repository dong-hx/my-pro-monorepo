import * as React from 'react'

import { cn } from '@repo/ui'
import { type VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva('label-caps inline-flex items-center rounded-full px-3 py-1', {
  variants: {
    variant: {
      neutral: 'bg-ink/90 text-white',
      clay: 'bg-clay text-white',
      sage: 'bg-sage text-white',
      outline: 'border border-sage/40 text-ink',
      muted: 'bg-sand text-muted',
      new: 'bg-white text-ink shadow-soft',
      sale: 'bg-clay text-white',
    },
  },
  defaultVariants: { variant: 'neutral' },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
