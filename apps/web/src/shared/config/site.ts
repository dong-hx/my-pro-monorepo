/** 站点 URL（不依赖 Shopify 凭证） */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return url.replace(/\/$/, '')
}

export const SITE_NAME = 'Zyvera'
