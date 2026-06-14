import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'
import { AuthPage } from '@/pages/auth/auth-page'
import { ForgotScreen } from '@/pages/auth/screens/forgot-screen'
import { LoginScreen } from '@/pages/auth/screens/login-screen'
import { RegisterAdminScreen } from '@/pages/auth/screens/register-admin-screen'
import { RegisterCustomerScreen } from '@/pages/auth/screens/register-customer-screen'
import { RolePickScreen } from '@/pages/auth/screens/role-pick-screen'
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
    element: <AuthPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/role-pick" replace />,
      },
      {
        path: 'role-pick',
        element: <RolePickScreen />,
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'register/customer',
        element: <RegisterCustomerScreen />,
      },
      {
        path: 'register/court-owner',
        element: <RegisterAdminScreen />,
      },
      {
        path: 'forgot-password',
        element: <ForgotScreen />,
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
