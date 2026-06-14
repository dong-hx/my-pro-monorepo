/** 商品详情页路径（编码 handle，兼容中文等非 ASCII）。 */
export function productPath(handle: string): string {
  return `/products/${encodeURIComponent(handle)}`
}

/** 集合页路径 */
export function collectionPath(handle: string): string {
  return `/collections/${encodeURIComponent(handle)}`
}
