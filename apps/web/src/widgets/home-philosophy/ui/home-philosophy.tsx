import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { HOME_PHILOSOPHY } from '@/shared/config/home-content'

export function HomePhilosophy() {
  return (
    <section className="section-shell">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-card bg-sand">
            <Image
              src={HOME_PHILOSOPHY.image.src}
              alt={HOME_PHILOSOPHY.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -right-2 top-3 flex h-[5.75rem] w-[5.75rem] -rotate-12 flex-col items-center justify-center rounded-full bg-clay text-white shadow-soft lg:-right-4 lg:-top-2 lg:h-[7.25rem] lg:w-[7.25rem] lg:-rotate-[14deg]"
          >
            <span className="label-caps leading-tight">{HOME_PHILOSOPHY.badge.line1}</span>
            <span className="label-caps mt-0.5 leading-tight">{HOME_PHILOSOPHY.badge.line2}</span>
          </div>
        </div>

        <div className="max-w-lg">
          <p className="home-kicker">{HOME_PHILOSOPHY.eyebrow}</p>
          <h2 className="section-title mt-3 lg:text-4xl">{HOME_PHILOSOPHY.title}</h2>
          <p className="mt-5 text-sm leading-7 text-muted">{HOME_PHILOSOPHY.description}</p>
          <Link
            href={HOME_PHILOSOPHY.cta.href}
            className="home-link-caps mt-6 inline-flex items-center gap-1"
          >
            {HOME_PHILOSOPHY.cta.label}
            <ChevronRight className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
