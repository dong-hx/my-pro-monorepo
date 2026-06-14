import type { Metadata } from 'next'

import { ContactForm } from '@/features/contact'

export const metadata: Metadata = {
  title: 'Contact Us',
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-14 lg:px-8">
      <h1 className="page-title">Contact us</h1>
      <p className="mt-3 text-muted">
        Questions about an order, product, or partnership? We&apos;d love to hear from you.
      </p>
      <ContactForm />
    </main>
  )
}
