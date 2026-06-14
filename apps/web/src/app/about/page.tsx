import type { Metadata } from 'next'

import { SITE_NAME } from '@/shared/config/site'

export const metadata: Metadata = {
  title: 'About Us',
  description: `The story behind ${SITE_NAME} — quiet luxury for modern companions.`,
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <p className="home-kicker text-sage">Our story</p>
      <h1 className="page-title mt-3">Crafted with care</h1>
      <div className="mt-8 space-y-5 text-muted">
        <p>
          {SITE_NAME} was born from a simple belief: the products we choose for our companions
          should reflect the same intention we bring to our own wellbeing.
        </p>
        <p>
          We partner with artisans and sustainable suppliers to create essentials that are
          beautiful, functional, and gentle on the planet — from organic nutrition to thoughtfully
          designed bedding.
        </p>
        <p>
          Every item in our collection is vetted for quality, safety, and ethical sourcing. Because
          your pet deserves quiet luxury, too.
        </p>
      </div>
    </main>
  )
}
