import { createBrowserRouter } from 'react-router-dom'

import { LoginPage } from '@/features/auth/pages/login-page'
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'
import { UsersPage } from '@/features/users/pages/users-page'
import { ForbiddenPage } from '@/shared/pages/forbidden-page'

import { AuthGuard } from './guards/auth-guard'

export const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
    ],
  },
  {
    element: <AuthGuard requiredRole="admin" />,
    children: [
      {
        path: '/users',
        element: <UsersPage />,
      },
    ],
  },
])
