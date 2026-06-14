'use client'

import Script from 'next/script'

import { useConsentStore } from '../model/use-consent-store'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function Analytics() {
  const status = useConsentStore((s) => s.status)

  if (!GA_ID || status !== 'accepted') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
