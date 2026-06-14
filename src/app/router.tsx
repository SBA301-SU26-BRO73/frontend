import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'
import { ForgotPage } from '@/pages/auth/forgot-page'
import { LoginPage } from '@/pages/auth/login-page'
import { RegisterAdminPage } from '@/pages/auth/register-admin-page'
import { RegisterCustomerPage } from '@/pages/auth/register-customer-page'
import { RolePickPage } from '@/pages/auth/role-pick-page'
import { DocsPage } from '@/pages/docs/docs-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import { ProfilePage } from '@/pages/profile/profile-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        index: true,
        element: <Navigate to="/auth/role-pick" replace />,
      },
      {
        path: 'role-pick',
        element: <RolePickPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register/customer',
        element: <RegisterCustomerPage />,
      },
      {
        path: 'register/court-owner',
        element: <RegisterAdminPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPage />,
      },
    ],
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
