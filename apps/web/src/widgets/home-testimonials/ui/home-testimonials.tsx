import { Star } from 'lucide-react'

import { HOME_TESTIMONIALS } from '@/shared/config/home-content'

export function HomeTestimonials() {
  return (
    <section className="bg-cream py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="section-title text-center">Trusted by Thousands of Pets</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HOME_TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="flex h-full flex-col rounded-card border border-soft-clay/60 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="flex gap-0.5 text-clay" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current stroke-none" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-7 text-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-soft-clay/30 pt-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand text-xs font-semibold text-ink"
                  aria-hidden
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-xs text-muted">{item.location}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
