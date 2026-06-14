import Image from 'next/image'
import Link from 'next/link'

import { HOME_CATEGORY_BANNERS } from '@/shared/config/home-content'

export function HomeCategoryBanners() {
  return (
    <section className="section-shell">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {HOME_CATEGORY_BANNERS.map((banner) => (
          <Link
            key={banner.href}
            href={banner.href}
            className="group relative aspect-[16/10] overflow-hidden rounded-card"
          >
            <Image
              src={banner.image.src}
              alt={banner.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
              <h2 className="section-title text-white">{banner.title}</h2>
              <p className="home-link-caps mt-4 text-white decoration-white/70 hover:text-white">
                {banner.cta}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
