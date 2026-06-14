import Image from 'next/image'
import Link from 'next/link'

import { HOME_LIFESTYLE } from '@/shared/config/home-content'

export function HomeLifestyle() {
  return (
    <section className="bg-sand-dim py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="section-title text-center">Shop by Lifestyle</h2>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {HOME_LIFESTYLE.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative aspect-square w-full max-w-[9.5rem] overflow-hidden rounded-full border border-soft-clay/40 bg-sand lg:max-w-[10.5rem]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-ink transition-colors group-hover:text-clay">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
