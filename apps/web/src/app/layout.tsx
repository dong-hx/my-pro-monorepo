import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { CartDrawer, CartProvider } from '@/features/cart'
import { Analytics, CookieBanner } from '@/features/cookie-consent'
import { SearchDialog } from '@/features/search'
import { fontDisplay, fontSans } from '@/shared/config/fonts'
import { SITE_NAME, getSiteUrl } from '@/shared/config/site'
import { organizationJsonLd } from '@/shared/lib/json-ld'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { PromoBar } from '@/widgets/promo-bar'
import { ScrollToTop } from '@/widgets/scroll-to-top'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Premium pet products for the modern companion.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgLd = organizationJsonLd()

  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <CartProvider>
          <PromoBar />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
          <SearchDialog />
          <ScrollToTop />
        </CartProvider>
        <CookieBanner />
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
