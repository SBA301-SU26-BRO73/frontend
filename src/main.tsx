import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import '@/index.css'
import { AppProviders } from '@/app/providers/app-providers'
import { queryClient } from '@/app/query-client'
import { router } from '@/app/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
