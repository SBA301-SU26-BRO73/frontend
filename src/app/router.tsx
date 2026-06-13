import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'
import { DocsPage } from '@/pages/docs/docs-page'
import { BranchFormPage } from '@/pages/branches/branch-form-page'
import { BranchListPage } from '@/pages/branches/branch-list-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'

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
        path: 'branches',
        element: <BranchListPage />,
      },
      {
        path: 'branches/new',
        element: <BranchFormPage mode="create" />,
      },
      {
        path: 'branches/:branchId/edit',
        element: <BranchFormPage mode="edit" />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
