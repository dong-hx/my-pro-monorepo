'use client'

import * as React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@repo/ui'
import { X } from 'lucide-react'

export const Drawer = Dialog.Root
export const DrawerTrigger = Dialog.Trigger
export const DrawerClose = Dialog.Close

type Side = 'right' | 'left' | 'bottom'

const sideClasses: Record<Side, string> = {
  right:
    'inset-y-0 right-0 h-full w-full max-w-md data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
  left: 'inset-y-0 left-0 h-full w-full max-w-md',
  bottom: 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl',
}

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: Side
  title: string
  /** 隐藏标题（仅供无障碍） */
  hideTitle?: boolean
}

export const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  DrawerContentProps
>(({ className, children, side = 'right', title, hideTitle, ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
    <Dialog.Content
      ref={ref}
      className={cn(
        'fixed z-50 flex flex-col bg-cream shadow-soft focus:outline-none',
        sideClasses[side],
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-soft-clay/30 px-5 py-4">
        <Dialog.Title
          className={cn('font-display text-lg font-semibold text-ink', hideTitle && 'sr-only')}
        >
          {title}
        </Dialog.Title>
        <Dialog.Close
          className="rounded-md p-1 text-muted transition-colors hover:bg-sage/10 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </Dialog.Close>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </Dialog.Content>
  </Dialog.Portal>
))
DrawerContent.displayName = 'DrawerContent'
