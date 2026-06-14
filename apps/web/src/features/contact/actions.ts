'use server'

import { contactSchema } from './schemas/contact.schema'

export interface ContactResult {
  ok: boolean
  message: string
}

export async function submitContact(raw: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? '提交无效' }
  }
  // TODO: 接入邮件服务（Resend/SendGrid）或 Shopify 客服工单
  return { ok: true, message: 'Thanks — we will get back to you within 1–2 business days.' }
}
