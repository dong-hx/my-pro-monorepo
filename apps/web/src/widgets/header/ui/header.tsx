'use client'

import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useCart } from '@/features/cart'
import { MAIN_NAV, isNavLinkActive } from '@/shared/config/navigation'
import { SITE_NAME } from '@/shared/config/site'
import { useUIStore } from '@/shared/model'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger, NavLink } from '@/shared/ui'

export function Header() {
  const pathname = usePathname()
  const setCartOpen = useUIStore((s) => s.setCartOpen)
  const setSearchOpen = useUIStore((s) => s.setSearchOpen)
  const cartCount = useCart().totalQuantity

  return (
    <header className="sticky top-0 z-30 border-b border-soft-clay/30 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/90">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="lg:hidden">
          <Drawer>
            <DrawerTrigger aria-label="Open menu" className="p-1 text-ink">
              <Menu className="h-5 w-5" />
            </DrawerTrigger>
            <DrawerContent side="left" title="Menu" hideTitle>
              <nav className="flex flex-col px-5 py-4">
                {MAIN_NAV.map((item) => {
                  const active = isNavLinkActive(pathname, item.href)
                  return (
                    <DrawerClose asChild key={item.href}>
                      <NavLink
                        href={item.href}
                        label={item.label}
                        active={active}
                        className="block border-b border-soft-clay/25 py-3 text-base"
                      />
                    </DrawerClose>
                  )
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>

        <Link
          href="/"
          className="col-start-2 row-start-1 justify-self-center font-display text-lg font-bold tracking-tight text-ink lg:col-start-1 lg:justify-self-start"
        >
          {SITE_NAME}
        </Link>

        <nav className="col-start-2 row-start-1 hidden items-center justify-center gap-8 lg:flex">
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={isNavLinkActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="col-start-3 row-start-1 flex items-center gap-4 justify-self-end lg:col-start-3">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="text-ink transition-colors hover:text-clay"
          >
            <Search className="h-5 w-5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            aria-label="Account (coming soon)"
            disabled
            className="hidden text-muted sm:block"
            title="Account coming soon"
          >
            <User className="h-5 w-5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative text-ink transition-colors hover:text-clay"
          >
            <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-xs font-medium text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
