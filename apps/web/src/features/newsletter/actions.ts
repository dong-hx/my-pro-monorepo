'use server'

import { newsletterSchema } from './schemas/newsletter.schema'

export interface ActionResult {
  ok: boolean
  message: string
}

export async function subscribeNewsletter(raw: unknown): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? '提交无效' }
  }
  // 蜜罐命中：静默成功，不做处理
  if (parsed.data.company) {
    return { ok: true, message: 'Subscribed' }
  }

  // TODO: 接入 Shopify 客户营销同意（Admin API）或 Klaviyo。
  // 当前阶段仅校验通过即视为成功，集成点已就绪。
  return { ok: true, message: 'Thanks for joining our community!' }
}
