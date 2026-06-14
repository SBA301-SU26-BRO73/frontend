import type { PropsWithChildren } from 'react'
import {
  QueryClientProvider,
  type QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AuthProvider } from '@/context/auth-context'

type AppProvidersProps = PropsWithChildren<{
  queryClient: QueryClient
}>

export function AppProviders({
  children,
  queryClient,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
