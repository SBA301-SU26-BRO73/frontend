import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AdminLayout } from '@/layouts/admin-layout'
import { MainLayout } from '@/layouts/main-layout'
import { StaffLayout } from '@/layouts/staff-layout'
import { DocsPage } from '@/pages/docs/docs-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import { StaffPage } from '@/pages/staff/staff-page'
import { StaffSchedulePage } from '@/pages/staff/staff-schedule-page'
import { StaffCheckInPage } from '@/pages/staff/staff-check-in-page'
import { StaffWalkInPage } from '@/pages/staff/staff-walk-in-page'
import { StaffCheckoutPage } from '@/pages/staff/staff-checkout-page'

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
    path: '/staff',
    element: <StaffLayout />,
    children: [
      {
        index: true,
        element: <StaffSchedulePage />,
      },
      {
        path: 'check-in',
        element: <StaffCheckInPage />,
      },
      {
        path: 'walk-in',
        element: <StaffWalkInPage />,
      },
      {
        path: 'checkout/:bookingId',
        element: <StaffCheckoutPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
