'use client'

import * as React from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'
import { cn } from '@repo/ui'
import { X } from 'lucide-react'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogClose = RadixDialog.Close

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  title: string
  /** 隐藏标题（仅供无障碍） */
  hideTitle?: boolean
}

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Content>,
  DialogContentProps
>(({ className, children, title, hideTitle, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-40 bg-ink/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-[12vh] z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-2xl bg-cream shadow-soft focus:outline-none data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-soft-clay/30 px-5 py-4">
        <RadixDialog.Title
          className={cn('font-display text-lg font-semibold text-ink', hideTitle && 'sr-only')}
        >
          {title}
        </RadixDialog.Title>
        <RadixDialog.Close
          className="rounded-md p-1 text-muted transition-colors hover:bg-sage/10 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </RadixDialog.Close>
      </div>
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
))
DialogContent.displayName = 'DialogContent'
