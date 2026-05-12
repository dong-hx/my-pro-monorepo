import { Link } from 'react-router-dom'

import { Button } from 'antd'

import dayjs from 'dayjs'

import { useAuthStore } from '@/entities/session'
import { useHealthQuery } from '@/entities/system'

export const DashboardPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout)
  const healthQuery = useHealthQuery()

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">控制台首页</h1>
          <p className="text-sm text-slate-500">
            当前用户：{currentUser?.name}（{currentUser?.role}）
          </p>
        </div>
        <Button onClick={logout}>退出登录</Button>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 p-5">
          <h2 className="mb-2 text-lg font-medium">权限路由</h2>
          <p className="mb-4 text-sm text-slate-600">“用户管理”页面需要 admin 权限。</p>
          <Link className="text-sm text-blue-600 hover:underline" to="/users">
            前往用户管理
          </Link>
        </article>
        <article className="rounded-xl border border-slate-200 p-5">
          <h2 className="mb-2 text-lg font-medium">API 健康检查</h2>
          <p className="mb-4 text-sm text-slate-600">
            {healthQuery.data
              ? `服务在线，时间：${dayjs(healthQuery.data.timestamp).format('YYYY-MM-DD HH:mm:ss')}`
              : '正在请求 /api/health ...'}
          </p>
          {healthQuery.isError ? (
            <span className="text-sm text-red-600">服务不可达，请检查 API 是否启动。</span>
          ) : null}
        </article>
      </section>
    </main>
  )
}
