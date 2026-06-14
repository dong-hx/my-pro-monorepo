export interface NavLink {
  label: string
  href: string
}

/** 判断主导航项是否为当前页面（精确匹配路径，忽略 query/hash）。 */
export function isNavLinkActive(pathname: string, href: string): boolean {
  const current = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  const target = href.endsWith('/') && href.length > 1 ? href.slice(0, -1) : href
  if (current === target) return true
  // Figma 首页默认高亮 Shop All
  if (current === '/' && target === '/collections/all') return true
  return false
}

// 主导航（设计稿固定菜单；dogs/cats/wellness 无 Shopify 集合时按 tag 筛选，见 curated-collections.ts）
export const MAIN_NAV: NavLink[] = [
  { label: 'Shop All', href: '/collections/all' },
  { label: 'Dogs', href: '/collections/dogs' },
  { label: 'Cats', href: '/collections/cats' },
  { label: 'Wellness', href: '/collections/wellness' },
  { label: 'About Us', href: '/about' },
]

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Dogs', href: '/collections/dogs' },
      { label: 'Cats', href: '/collections/cats' },
      { label: 'Wellness', href: '/collections/wellness' },
      { label: 'All Products', href: '/collections/all' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Brand Story', href: '/about' },
    ],
  },
]

export const PROMO_TEXT = 'Free shipping on all orders over $75'
