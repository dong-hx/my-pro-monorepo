import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { Alert, Button, Card, Form, Input, Typography } from 'antd'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/entities/session'
import { type LoginSchemaInput, loginSchema } from '@/features/auth/sign-in-by-password'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const loginAsDemoUser = useAuthStore((state) => state.loginAsDemoUser)
  const redirectPath = (location.state as { from?: string } | null)?.from ?? '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async () => {
    loginAsDemoUser('admin')
    navigate(redirectPath, { replace: true })
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <Card className="w-full" styles={{ body: { paddingBottom: 8 } }}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          Admin 登录
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
          基于 RHF + Zod 的登录表单示例
        </Typography.Paragraph>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="邮箱"
            required
            validateStatus={errors.email ? 'error' : undefined}
            help={errors.email?.message}
          >
            <Input placeholder="demo@company.com" {...register('email')} />
          </Form.Item>

          <Form.Item
            label="密码"
            required
            validateStatus={errors.password ? 'error' : undefined}
            help={errors.password?.message}
          >
            <Input.Password placeholder="至少 8 位" {...register('password')} />
          </Form.Item>

          {errors.root?.message ? (
            <Alert message={errors.root.message} showIcon type="error" />
          ) : null}

          <Form.Item style={{ marginTop: 16 }}>
            <Button block htmlType="submit" loading={isSubmitting} type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  )
}
