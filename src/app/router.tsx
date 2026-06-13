import { createBrowserRouter } from 'react-router-dom'

import { DocsPage } from '@/pages/docs/docs-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import MainLayout from '@/layouts/main-layout'
import HomePage from '@/pages/home/home-page'
import BranchListPage from '@/pages/branch/branch-list-page'
import BranchDetailPage from '@/pages/branch/branch-detail-page'
import SlotBookingPage from '@/pages/slot-booking/slot-booking-page'

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
      {
        path: 'slot-booking',
        element: <SlotBookingPage />,
      },
      {
        path: 'branches',
        children: [
          {
            index: true, 
            element: <BranchListPage />,
          },
          {
            path: ':id',
            element: <BranchDetailPage />,
          },
        ]
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])