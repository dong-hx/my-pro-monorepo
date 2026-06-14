import { PROMO_TEXT } from '@/shared/config/navigation'

export function PromoBar() {
  return (
    <div className="bg-ink text-center label-caps text-white">
      <p className="px-4 py-2">{PROMO_TEXT}</p>
    </div>
  )
}
