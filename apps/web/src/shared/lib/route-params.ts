/** Next.js 动态段中的非 ASCII handle 可能仍为 URL 编码，需解码后再调 Shopify API。 */
export function decodeRouteParam(value: string): string {
  if (!value.includes('%')) return value
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
