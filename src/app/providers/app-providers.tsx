import type { PropsWithChildren } from 'react'
import {
  QueryClientProvider,
  type QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { StaffSessionProvider } from '@/context/staff-session-context'

type AppProvidersProps = PropsWithChildren<{
  queryClient: QueryClient
}>

export function AppProviders({
  children,
  queryClient,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StaffSessionProvider>{children}</StaffSessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
