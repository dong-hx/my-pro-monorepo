import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Alert, Button, Form, Input, Typography } from 'antd'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuthStore } from '@/entities/session'
import {
  type RegisterSchemaInput,
  registerSchema,
  useCountdown,
  useRegisterMutation,
  useSendCodeMutation,
} from '@/features/auth'
import { AuthLayout } from '@/shared/ui'

const emailOnlySchema = z.email({
  error: (iss) => (!iss.input ? '请输入邮箱' : '邮箱格式不正确'),
})

export const RegisterPage = () => {
  const navigate = useNavigate()
  const setAuthFromLogin = useAuthStore((s) => s.setAuthFromLogin)
  const countdown = useCountdown(60)
  const sendCodeMutation = useSendCodeMutation()
  const registerMutation = useRegisterMutation()

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', code: '', password: '', confirmPassword: '', name: '' },
  })

  const handleSendCode = async () => {
    const email = getValues('email')
    const result = emailOnlySchema.safeParse(email)
    if (!result.success) {
      setError('email', { message: result.error.issues[0].message })
      return
    }

    try {
      await sendCodeMutation.mutateAsync({ email, purpose: 'register' })
      countdown.start()
    } catch {
      /* httpClient 拦截器已处理 */
    }
  }

  const onSubmit = async (values: RegisterSchemaInput) => {
    try {
      const res = await registerMutation.mutateAsync({
        email: values.email,
        password: values.password,
        code: values.code,
        name: values.name || undefined,
      })
      setAuthFromLogin(res)
      navigate('/', { replace: true })
    } catch {
      setError('root', { message: '注册失败，请重试' })
    }
  }

  return (
    <AuthLayout title="注册账号" subtitle="填写以下信息完成注册">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="邮箱"
          required
          validateStatus={errors.email ? 'error' : undefined}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input placeholder="your@email.com" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="验证码"
          required
          validateStatus={errors.code ? 'error' : undefined}
          help={errors.code?.message}
        >
          <div className="flex gap-2">
            <Controller
              name="code"
              control={control}
              render={({ field }) => <Input placeholder="6 位验证码" maxLength={6} {...field} />}
            />
            <Button
              onClick={handleSendCode}
              disabled={countdown.isActive}
              loading={sendCodeMutation.isPending}
              style={{ flexShrink: 0 }}
            >
              {countdown.isActive ? `${countdown.remaining}s` : '获取验证码'}
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          label="昵称"
          validateStatus={errors.name ? 'error' : undefined}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input placeholder="可选" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="密码"
          required
          validateStatus={errors.password ? 'error' : undefined}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password placeholder="至少 8 位" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="确认密码"
          required
          validateStatus={errors.confirmPassword ? 'error' : undefined}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <Input.Password placeholder="再次输入密码" {...field} />}
          />
        </Form.Item>

        {errors.root?.message ? (
          <Alert message={errors.root.message} showIcon type="error" style={{ marginBottom: 16 }} />
        ) : null}

        <Form.Item style={{ marginTop: 16 }}>
          <Button block htmlType="submit" loading={isSubmitting} type="primary">
            注册
          </Button>
        </Form.Item>

        <div className="text-center">
          <Typography.Text type="secondary">
            已有账号？ <Link to="/login">去登录</Link>
          </Typography.Text>
        </div>
      </Form>
    </AuthLayout>
  )
}
