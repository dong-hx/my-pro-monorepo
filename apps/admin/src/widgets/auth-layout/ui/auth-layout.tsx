import type { PropsWithChildren } from 'react'

import { Card, Typography } from 'antd'

interface AuthLayoutProps extends PropsWithChildren {
  title: string
  subtitle: string
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <Card className="w-full" styles={{ body: { paddingBottom: 8 } }}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          {title}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
          {subtitle}
        </Typography.Paragraph>
        {children}
      </Card>
    </main>
  )
}
