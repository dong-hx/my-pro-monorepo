import { createBrowserRouter } from 'react-router-dom'

import { DashboardPage } from '@/pages/dashboard'
import { ForbiddenPage } from '@/pages/forbidden'
import { LoginPage } from '@/pages/login'
import { UsersPage } from '@/pages/users'

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
