import type { Metadata } from 'next'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
}

const sections = [
  {
    title: 'Shipping',
    body: 'We offer carbon-neutral shipping on all orders. Standard delivery takes 3–7 business days. Free shipping on orders over $75.',
  },
  {
    title: 'Returns',
    body: 'Unused items in original packaging may be returned within 30 days for a full refund. Contact us to initiate a return.',
  },
  {
    title: 'Damaged items',
    body: 'If your order arrives damaged, please contact us within 48 hours with photos and we will replace or refund promptly.',
  },
]

export default function ShippingReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <h1 className="page-title">Shipping &amp; Returns</h1>
      <Accordion type="single" collapsible className="mt-8" defaultValue="item-0">
        {sections.map((s, i) => (
          <AccordionItem key={s.title} value={`item-${i}`}>
            <AccordionTrigger>{s.title}</AccordionTrigger>
            <AccordionContent>{s.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}
