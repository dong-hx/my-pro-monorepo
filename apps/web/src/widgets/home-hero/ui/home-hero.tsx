import Image from 'next/image'
import Link from 'next/link'

import { HOME_HERO } from '@/shared/config/home-content'
import { Button } from '@/shared/ui'

export function HomeHero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <p className="home-eyebrow">{HOME_HERO.eyebrow}</p>
          <h1 className="page-title mt-4 leading-[1.08] lg:text-[3.35rem]">{HOME_HERO.title}</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">{HOME_HERO.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="label-caps px-8">
              <Link href={HOME_HERO.primaryCta.href}>{HOME_HERO.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="label-caps bg-white px-8">
              <Link href={HOME_HERO.secondaryCta.href}>{HOME_HERO.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-sand lg:aspect-[5/6]">
          <Image
            src={HOME_HERO.image.src}
            alt={HOME_HERO.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
