import { isShopifyConfigured } from '@/shared/config/env'
import { getProducts } from '@/shared/shopify'
import { HomeCategoryBanners } from '@/widgets/home-category-banners'
import { HomeFeatures } from '@/widgets/home-features'
import { HomeHero } from '@/widgets/home-hero'
import { HomeLifestyle } from '@/widgets/home-lifestyle'
import { HomeNewsletter } from '@/widgets/home-newsletter'
import { HomePhilosophy } from '@/widgets/home-philosophy'
import { HomeTestimonials } from '@/widgets/home-testimonials'
import { ProductRail } from '@/widgets/product-rail'

export default async function HomePage() {
  const configured = isShopifyConfigured()
  const products = configured
    ? await getProducts({ first: 8, sortKey: 'BEST_SELLING' }).catch(() => ({
        items: [],
        pageInfo: { hasNextPage: false, endCursor: null },
      }))
    : { items: [], pageInfo: { hasNextPage: false, endCursor: null } }

  return (
    <>
      <HomeHero />
      <HomeFeatures />

      {products.items.length > 0 ? (
        <ProductRail
          title="The Best Sellers"
          products={products.items}
          viewAllHref="/collections/all"
          viewAllLabel="View all products"
        />
      ) : (
        <section className="section-shell">
          <h2 className="section-title">The Best Sellers</h2>
          <p className="mt-4 text-muted">
            {configured
              ? '暂无商品数据，请在 Shopify 后台添加商品。'
              : '配置 .env.local 后即可展示 Shopify 商品。'}
          </p>
        </section>
      )}

      <HomeCategoryBanners />
      <HomeLifestyle />
      <HomePhilosophy />
      <HomeTestimonials />
      <HomeNewsletter />
    </>
  )
}
