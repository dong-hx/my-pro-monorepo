import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Alert, Button, Form, Input } from 'antd'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  type ForgotPasswordSchemaInput,
  type ResetPasswordSchemaInput,
  forgotPasswordSchema,
  resetPasswordSchema,
  useCountdown,
  useResetPasswordMutation,
  useSendCodeMutation,
} from '@/features/auth'
import { AuthLayout } from '@/widgets/auth-layout'

type Step = 'email' | 'reset'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const countdown = useCountdown(60)
  const sendCodeMutation = useSendCodeMutation()
  const resetPasswordMutation = useResetPasswordMutation()

  const emailForm = useForm<ForgotPasswordSchemaInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const resetForm = useForm<ResetPasswordSchemaInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '', code: '', newPassword: '', confirmPassword: '' },
  })

  const handleSendCode = async (values: ForgotPasswordSchemaInput) => {
    try {
      await sendCodeMutation.mutateAsync({
        email: values.email,
        purpose: 'reset-password',
      })
      setEmail(values.email)
      resetForm.setValue('email', values.email)
      countdown.start()
      setStep('reset')
    } catch {
      emailForm.setError('root', { message: '发送验证码失败' })
    }
  }

  const handleResendCode = async () => {
    try {
      await sendCodeMutation.mutateAsync({
        email,
        purpose: 'reset-password',
      })
      countdown.start()
    } catch {
      /* httpClient 拦截器已处理 */
    }
  }

  const handleReset = async (values: ResetPasswordSchemaInput) => {
    try {
      await resetPasswordMutation.mutateAsync({
        email: values.email,
        code: values.code,
        newPassword: values.newPassword,
      })
      navigate('/login', {
        replace: true,
        state: { message: '密码重置成功，请使用新密码登录' },
      })
    } catch {
      resetForm.setError('root', { message: '重置密码失败，请重试' })
    }
  }

  if (step === 'email') {
    return (
      <AuthLayout title="找回密码" subtitle="输入注册邮箱，我们将发送验证码">
        <Form layout="vertical" onFinish={emailForm.handleSubmit(handleSendCode)}>
          <Form.Item
            label="邮箱"
            required
            validateStatus={emailForm.formState.errors.email ? 'error' : undefined}
            help={emailForm.formState.errors.email?.message}
          >
            <Controller
              name="email"
              control={emailForm.control}
              render={({ field }) => <Input placeholder="your@email.com" {...field} />}
            />
          </Form.Item>

          {emailForm.formState.errors.root?.message ? (
            <Alert
              message={emailForm.formState.errors.root.message}
              showIcon
              type="error"
              style={{ marginBottom: 16 }}
            />
          ) : null}

          <Form.Item style={{ marginTop: 16 }}>
            <Button block htmlType="submit" loading={sendCodeMutation.isPending} type="primary">
              发送验证码
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link to="/login">返回登录</Link>
          </div>
        </Form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="重置密码" subtitle={`验证码已发送至 ${email}`}>
      <Form layout="vertical" onFinish={resetForm.handleSubmit(handleReset)}>
        <Form.Item
          label="验证码"
          required
          validateStatus={resetForm.formState.errors.code ? 'error' : undefined}
          help={resetForm.formState.errors.code?.message}
        >
          <div className="flex gap-2">
            <Controller
              name="code"
              control={resetForm.control}
              render={({ field }) => <Input placeholder="6 位验证码" maxLength={6} {...field} />}
            />
            <Button
              onClick={handleResendCode}
              disabled={countdown.isActive}
              loading={sendCodeMutation.isPending}
              style={{ flexShrink: 0 }}
            >
              {countdown.isActive ? `${countdown.remaining}s` : '重新发送'}
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          label="新密码"
          required
          validateStatus={resetForm.formState.errors.newPassword ? 'error' : undefined}
          help={resetForm.formState.errors.newPassword?.message}
        >
          <Controller
            name="newPassword"
            control={resetForm.control}
            render={({ field }) => <Input.Password placeholder="至少 8 位" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          required
          validateStatus={resetForm.formState.errors.confirmPassword ? 'error' : undefined}
          help={resetForm.formState.errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={resetForm.control}
            render={({ field }) => <Input.Password placeholder="再次输入新密码" {...field} />}
          />
        </Form.Item>

        {resetForm.formState.errors.root?.message ? (
          <Alert
            message={resetForm.formState.errors.root.message}
            showIcon
            type="error"
            style={{ marginBottom: 16 }}
          />
        ) : null}

        <Form.Item style={{ marginTop: 16 }}>
          <Button block htmlType="submit" loading={resetPasswordMutation.isPending} type="primary">
            重置密码
          </Button>
        </Form.Item>

        <div className="text-center">
          <Link to="/login">返回登录</Link>
        </div>
      </Form>
    </AuthLayout>
  )
}
