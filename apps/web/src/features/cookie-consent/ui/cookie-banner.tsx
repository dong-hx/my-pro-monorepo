'use client'

import { useSyncExternalStore } from 'react'

import { Button } from '@/shared/ui'

import { useConsentStore } from '../model/use-consent-store'

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function CookieBanner() {
  const isClient = useIsClient()
  const status = useConsentStore((s) => s.status)
  const accept = useConsentStore((s) => s.accept)
  const decline = useConsentStore((s) => s.decline)

  if (!isClient || status !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-card border border-soft-clay/30 bg-cream p-5 shadow-soft lg:inset-x-auto lg:bottom-6 lg:left-6 lg:right-auto"
    >
      <p className="text-sm text-ink">
        We use cookies for analytics to improve your experience. You can accept or decline
        non-essential cookies.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={accept}>
          Accept
        </Button>
        <Button size="sm" variant="outline" onClick={decline}>
          Decline
        </Button>
      </div>
    </div>
  )
}
