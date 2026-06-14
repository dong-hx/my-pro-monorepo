import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { isShopifyConfigured } from '@/shared/config/env'
import { TAGS } from '@/shared/shopify'

/** Shopify webhook：按需失效 ISR 缓存 */
export async function POST(req: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ ok: false, error: 'Shopify not configured' }, { status: 503 })
  }

  const secret = process.env.SHOPIFY_REVALIDATION_SECRET
  if (process.env.NODE_ENV === 'production' && !secret) {
    return NextResponse.json(
      { ok: false, error: 'Revalidation secret not configured' },
      { status: 503 },
    )
  }
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }
  }

  const topic = req.headers.get('x-shopify-topic') ?? ''
  let body: { handle?: string } = {}
  try {
    body = (await req.json()) as { handle?: string }
  } catch {
    // webhook 可能无 body
  }

  // Next 16: revalidateTag 需要 profile 参数
  const profile = 'max'

  if (topic.includes('product')) {
    revalidateTag(TAGS.products, profile)
    if (body.handle) revalidateTag(`product:${body.handle}`, profile)
  } else if (topic.includes('collection')) {
    revalidateTag(TAGS.collections, profile)
  } else {
    revalidateTag(TAGS.products, profile)
    revalidateTag(TAGS.collections, profile)
  }

  return NextResponse.json({ ok: true, revalidated: true, topic })
}
