import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, Card, Form, Input, Typography } from 'antd'

import { zodResolver } from '@hookform/resolvers/zod'

import { useLoginMutation } from '../api/use-login-mutation'
import { type LoginSchemaInput, loginSchema } from '../schemas/login.schema'
import { useAuthStore } from '../store/auth-store'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuthFromLogin = useAuthStore((state) => state.setAuthFromLogin)
  const loginMutation = useLoginMutation()
  const redirectPath = (location.state as { from?: string } | null)?.from ?? '/'

  const {
    clearErrors,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchemaInput) => {
    clearErrors()
    try {
      const res = await loginMutation.mutateAsync(data)
      setAuthFromLogin(res)
      navigate(redirectPath, { replace: true })
    } catch {
      // 接口错误文案由 `httpClient` 响应拦截器统一 `message.error` 展示
    }
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

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form layout="vertical" component={false}>
            <Form.Item
              label="邮箱"
              required
              validateStatus={errors.email ? 'error' : undefined}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input placeholder="demo@company.com" {...field} />}
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

            <Form.Item style={{ marginTop: 16 }}>
              <Button
                block
                htmlType="submit"
                loading={isSubmitting || loginMutation.isPending}
                type="primary"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </form>
      </Card>
    </main>
  )
}
