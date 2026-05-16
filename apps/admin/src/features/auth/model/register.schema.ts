import { z } from 'zod'

const emailField = z.email({
  error: (iss) => (!iss.input ? '请输入邮箱' : '邮箱格式不正确'),
})

export const registerSchema = z
  .object({
    email: emailField,
    code: z.string().min(6, '请输入 6 位验证码').max(6, '请输入 6 位验证码'),
    password: z.string().min(8, '密码至少 8 位'),
    confirmPassword: z.string().min(8, '请确认密码'),
    name: z.string().max(80).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次密码不一致',
    path: ['confirmPassword'],
  })

export type RegisterSchemaInput = z.infer<typeof registerSchema>
