/** 根据 Shopify quantityAvailable 生成库存提示文案。null 表示未知/不限购。 */
export function stockLimitMessage(quantityAvailable: number | null): string | null {
  if (quantityAvailable == null) return null
  if (quantityAvailable <= 0) return 'This item is out of stock'
  if (quantityAvailable === 1) return 'Only 1 left in stock'
  return `Only ${quantityAvailable} available in stock`
}

export function isAtStockLimit(quantity: number, quantityAvailable: number | null): boolean {
  return quantityAvailable != null && quantity >= quantityAvailable
}
