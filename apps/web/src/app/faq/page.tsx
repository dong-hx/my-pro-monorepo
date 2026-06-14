import type { Metadata } from 'next'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'FAQ',
}

const faqs = [
  {
    q: 'Where do you ship?',
    a: 'We currently ship within the United States. International shipping is coming soon.',
  },
  {
    q: 'Are your products organic?',
    a: 'Many of our nutrition and wellness products use certified organic ingredients. Check individual product pages for details.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once shipped, you will receive a tracking link via email from our fulfillment partner.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Contact us within 2 hours of placing your order and we will do our best to accommodate changes.',
  },
]

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <h1 className="page-title">Frequently asked questions</h1>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}
