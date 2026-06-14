import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, '请输入姓名'),
  email: z.string().email('请输入有效邮箱'),
  message: z.string().min(10, '留言至少 10 个字符'),
})

export type ContactInput = z.infer<typeof contactSchema>
