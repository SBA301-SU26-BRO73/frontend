import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'
import { DocsPage } from '@/pages/docs/docs-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import {AdminBookingPage} from "@/pages/admin/AdminBookingPage.tsx";

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
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: 'admin',
    children: [
      {
        path: 'bookings',
        element: <AdminBookingPage />,
      },
    ],
  },
])
