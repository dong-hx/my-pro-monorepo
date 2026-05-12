import { Link } from 'react-router-dom'

export const ForbiddenPage = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center px-4">
      <section className="w-full rounded-xl border border-slate-200 p-6 text-center shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">无权限访问</h1>
        <p className="mb-4 text-sm text-slate-600">当前账号不具备访问该页面的角色权限。</p>
        <Link className="text-sm text-blue-600 hover:underline" to="/">
          返回首页
        </Link>
      </section>
    </main>
  )
}
