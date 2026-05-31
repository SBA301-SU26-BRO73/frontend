import type { PropsWithChildren } from 'react'
import {
  QueryClientProvider,
  type QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type AppProvidersProps = PropsWithChildren<{
  queryClient: QueryClient
}>

export function AppProviders({
  children,
  queryClient,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
