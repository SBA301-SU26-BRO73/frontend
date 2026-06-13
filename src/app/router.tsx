import { createBrowserRouter } from 'react-router-dom'

import { DocsPage } from '@/pages/docs/docs-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import MainLayout from '@/layouts/main-layout'
import HomePage from '@/pages/home/home-page'

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
])
