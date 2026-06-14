'use client'

import { useEffect, useState } from 'react'

import { cn } from '@repo/ui'
import { ArrowUp } from 'lucide-react'

import { Button } from '@/shared/ui'

import { SCROLL_TO_TOP_THRESHOLD } from '../lib/constants'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_TO_TOP_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <Button
      type="button"
      variant="sage"
      size="icon"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full shadow-soft transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5 stroke-[1.5]" />
    </Button>
  )
}
