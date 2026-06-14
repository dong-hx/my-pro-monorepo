import { Cross, Leaf, type LucideIcon, Package, Truck } from 'lucide-react'

import { HOME_FEATURES } from '@/shared/config/home-content'

const ICONS: Record<(typeof HOME_FEATURES)[number]['icon'], LucideIcon> = {
  leaf: Leaf,
  truck: Truck,
  cross: Cross,
  package: Package,
}

export function HomeFeatures() {
  return (
    <section className="bg-cream">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-12 lg:px-8 lg:py-14">
        <div className="grid w-full items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {HOME_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon]
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center justify-center text-center"
              >
                <Icon className="home-icon-line h-5 w-5 text-ink" aria-hidden strokeWidth={1.25} />
                <h2 className="mt-3 text-sm font-semibold text-ink">{feature.title}</h2>
                <p className="mt-1 max-w-[12rem] text-sm leading-5 text-muted">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
