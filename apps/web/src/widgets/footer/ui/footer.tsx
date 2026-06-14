import { NewsletterForm } from '@/features/newsletter'
import { FOOTER_NAV } from '@/shared/config/navigation'
import { SITE_NAME } from '@/shared/config/site'

import { FooterNavLinks } from './footer-nav-links'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-soft-clay/30 bg-sand">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-display text-xl font-bold tracking-tight text-ink">{SITE_NAME}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Defining the new standard in companion care through quiet luxury and thoughtful design.
          </p>
        </div>

        {FOOTER_NAV.map((col) => (
          <div key={col.title}>
            <h3 className="label-caps text-ink">{col.title}</h3>
            <FooterNavLinks links={col.links} />
          </div>
        ))}

        <div>
          <h3 className="label-caps text-ink">Journal</h3>
          <p className="mt-4 text-sm text-muted">
            Join our community for curated care tips and early access.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-soft-clay/30">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted lg:px-8">
          © {new Date().getFullYear()} {SITE_NAME}. Crafted with care for your companions.
        </p>
      </div>
    </footer>
  )
}
