import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DashboardLayout } from '@/layouts/dashboard-layout'
import { MainLayout } from '@/layouts/main-layout'
import { CourtTypesPage } from '@/pages/super-admin/court-types-page'
import { DashboardPage } from '@/pages/super-admin/dashboard-page'
import { PendingPage } from '@/pages/super-admin/pending-page'
import { PlansPage } from '@/pages/super-admin/plans-page'
import { ForgotPage } from '@/pages/auth/forgot-page'
import { LoginPage } from '@/pages/auth/login-page'
import { RegisterAdminPage } from '@/pages/auth/register-admin-page'
import { RegisterCustomerPage } from '@/pages/auth/register-customer-page'
import { RolePickPage } from '@/pages/auth/role-pick-page'
import { DocsPage } from '@/pages/docs/docs-page'
import { ForbiddenPage } from '@/pages/errors/forbidden-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import { ProfilePage } from '@/pages/profile/profile-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs', element: <DocsPage /> },
    ],
  },
  {
    path: 'auth',
    children: [
      { index: true, element: <Navigate to="/auth/role-pick" replace /> },
      { path: 'role-pick', element: <RolePickPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register/customer', element: <RegisterCustomerPage /> },
      { path: 'register/court-owner', element: <RegisterAdminPage /> },
      { path: 'forgot-password', element: <ForgotPage /> },
    ],
  },
  {
    path: 'super-admin',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'pending', element: <PendingPage /> },
      { path: 'court-types', element: <CourtTypesPage /> },
      { path: 'plans', element: <PlansPage /> },
    ],
  },
  { path: 'profile', element: <ProfilePage /> },
  { path: '403', element: <ForbiddenPage /> },
  { path: '*', element: <NotFoundPage /> },
])
