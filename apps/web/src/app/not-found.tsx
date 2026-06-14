import Link from 'next/link'

import { Button } from '@/shared/ui'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="page-title text-6xl font-semibold">404</p>
      <h1 className="text-xl text-ink">We couldn&apos;t find that page</h1>
      <p className="text-muted">
        The page may have moved or no longer exists. Let&apos;s get you back on track.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  )
}
