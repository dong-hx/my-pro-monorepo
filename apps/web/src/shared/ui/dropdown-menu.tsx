'use client'

import * as React from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@repo/ui'
import { Check } from 'lucide-react'

export const DropdownMenu = DropdownPrimitive.Root
export const DropdownMenuTrigger = DropdownPrimitive.Trigger

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownPrimitive.Portal>
    <DropdownPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-44 overflow-hidden rounded-xl border border-soft-clay/30 bg-cream p-1 shadow-soft data-[state=open]:animate-fade-in',
        className,
      )}
      {...props}
    />
  </DropdownPrimitive.Portal>
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

interface ItemProps extends React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Item> {
  selected?: boolean
}

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownPrimitive.Item>,
  ItemProps
>(({ className, children, selected, ...props }, ref) => (
  <DropdownPrimitive.Item
    ref={ref}
    className={cn(
      'flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-ink outline-none transition-colors data-[highlighted]:bg-sage/10',
      className,
    )}
    {...props}
  >
    {children}
    {selected && <Check className="h-4 w-4 text-clay" />}
  </DropdownPrimitive.Item>
))
DropdownMenuItem.displayName = 'DropdownMenuItem'
