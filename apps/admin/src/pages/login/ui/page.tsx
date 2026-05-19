import { Controller, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Alert, Button, Form, Input } from 'antd'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/entities/session'
import { type LoginSchemaInput, loginSchema, useLoginMutation } from '@/features/auth'
import { AuthLayout } from '@/widgets/auth-layout'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuthFromLogin = useAuthStore((s) => s.setAuthFromLogin)
  const loginMutation = useLoginMutation()
  const redirectPath = (location.state as { from?: string } | null)?.from ?? '/'
  const successMessage = (location.state as { message?: string } | null)?.message

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginSchemaInput) => {
    try {
      const res = await loginMutation.mutateAsync(values)
      setAuthFromLogin(res)
      navigate(redirectPath, { replace: true })
    } catch {
      setError('root', { message: '登录失败，请检查邮箱和密码' })
    }
  }

  return (
    <AuthLayout title="登录" subtitle="使用邮箱和密码登录管理后台">
      {successMessage ? (
        <Alert message={successMessage} showIcon type="success" style={{ marginBottom: 16 }} />
      ) : null}

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

        {errors.root?.message ? (
          <Alert message={errors.root.message} showIcon type="error" style={{ marginBottom: 16 }} />
        ) : null}

        <Form.Item style={{ marginTop: 16, marginBottom: 8 }}>
          <Button block htmlType="submit" loading={isSubmitting} type="primary">
            登录
          </Button>
        </Form.Item>

        <div className="flex justify-between">
          <Link to="/register">注册账号</Link>
          <Link to="/forgot-password">忘记密码？</Link>
        </div>
      </Form>
    </AuthLayout>
  )
}
