/** 规范化 Shopify / CDN 图片 URL，避免协议相对路径导致 Next/Image 加载失败 */
export function normalizeImageUrl(url: string): string {
  const trimmed = url.trim()
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`
  }
  return trimmed
}

export function isShopifyCdnUrl(url: string): boolean {
  try {
    const { hostname } = new URL(normalizeImageUrl(url))
    return hostname === 'cdn.shopify.com' || hostname.endsWith('.myshopify.com')
  } catch {
    return false
  }
}
