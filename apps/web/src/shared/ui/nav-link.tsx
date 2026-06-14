import { cn } from '@repo/ui'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  label: string
  active: boolean
  className?: string
}

/** 导航：muted 默认，选中 ink + coral 底条 */
export function NavLink({ href, label, active, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative inline-block pb-2.5 font-sans text-sm transition-colors',
        active ? 'font-medium text-ink' : 'text-muted hover:text-ink',
        className,
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-clay transition-opacity',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
    </Link>
  )
}
