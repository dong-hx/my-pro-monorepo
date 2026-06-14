import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.string().email('请输入有效邮箱'),
  // 蜜罐字段：正常用户不填，机器人会填
  company: z.string().max(0).optional(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
