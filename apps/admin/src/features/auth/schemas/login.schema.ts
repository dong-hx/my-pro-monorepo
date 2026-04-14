import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(8, '密码至少 8 位'),
})

export type LoginSchemaInput = z.infer<typeof loginSchema>
