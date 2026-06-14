import { cn } from '@repo/ui'
import Image, { type ImageProps } from 'next/image'

import { isShopifyCdnUrl, normalizeImageUrl } from '@/shared/lib/image-url'

type ShopifyImageProps = Omit<ImageProps, 'src' | 'unoptimized'> & {
  src: string
}

/** Shopify CDN 图片：直连 CDN，避免 Next 优化器 remotePatterns 匹配失败 */
export function ShopifyImage({ src, className, alt, ...props }: ShopifyImageProps) {
  const url = normalizeImageUrl(src)

  return (
    <Image
      {...props}
      src={url}
      alt={alt}
      unoptimized={isShopifyCdnUrl(url)}
      className={cn(className)}
    />
  )
}
