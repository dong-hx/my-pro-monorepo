import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { isShopifyConfigured } from '@/shared/config/env'
import { productJsonLd } from '@/shared/lib/json-ld'
import { decodeRouteParam } from '@/shared/lib/route-params'
import { getProduct, getProductRecommendations } from '@/shared/shopify'
import { ProductDetail } from '@/widgets/product-detail'
import { ProductRail } from '@/widgets/product-rail'

interface PageProps {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle: rawHandle } = await params
  const handle = decodeRouteParam(rawHandle)
  if (!isShopifyConfigured()) {
    return { title: handle }
  }
  const product = await getProduct(handle).catch(() => null)
  if (!product) return { title: 'Product not found' }
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: product.featuredImage
      ? {
          images: [
            { url: product.featuredImage.url, alt: product.featuredImage.altText ?? product.title },
          ],
        }
      : undefined,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { handle: rawHandle } = await params
  const handle = decodeRouteParam(rawHandle)

  if (!isShopifyConfigured()) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <p className="text-muted">
          请配置 <code className="text-ink">apps/web/.env.local</code> 中的 Shopify
          变量以加载商品数据。
        </p>
      </main>
    )
  }

  const product = await getProduct(handle).catch(() => null)
  if (!product) notFound()

  const recommendations = await getProductRecommendations(product.id).catch(() => [])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <ProductDetail key={product.id} product={product} />
      {recommendations.length > 0 && (
        <div className="mt-16 border-t border-soft-clay/30 pt-12">
          <ProductRail title="You may also like" products={recommendations} />
        </div>
      )}
    </main>
  )
}
