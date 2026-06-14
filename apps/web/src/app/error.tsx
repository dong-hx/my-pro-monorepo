'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'

import { Button } from '@/shared/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="page-title font-semibold">Something went wrong</h1>
      <p className="text-muted">
        We hit an unexpected error. Please try again, or come back in a moment.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  )
}
