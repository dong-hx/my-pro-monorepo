'use client'

import { usePathname } from 'next/navigation'

import { isNavLinkActive } from '@/shared/config/navigation'
import { NavLink } from '@/shared/ui'

interface FooterNavLinksProps {
  links: { label: string; href: string }[]
}

export function FooterNavLinks({ links }: FooterNavLinksProps) {
  const pathname = usePathname()

  return (
    <ul className="mt-4 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <NavLink
            href={link.href}
            label={link.label}
            active={isNavLinkActive(pathname, link.href)}
          />
        </li>
      ))}
    </ul>
  )
}
