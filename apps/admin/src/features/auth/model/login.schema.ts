import { z } from 'zod'

const emailField = z.email({
  error: (iss) => (!iss.input ? '请输入邮箱' : '邮箱格式不正确'),
})

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(8, '密码至少 8 位'),
})

export type LoginSchemaInput = z.infer<typeof loginSchema>
