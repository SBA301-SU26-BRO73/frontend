import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AdminLayout } from '@/layouts/admin-layout'
import { MainLayout } from '@/layouts/main-layout'
import { DocsPage } from '@/pages/docs/docs-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import { StaffPage } from '@/pages/staff/staff-page'

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
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="staff" replace />,
      },
      {
        path: 'staff',
        element: <StaffPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
