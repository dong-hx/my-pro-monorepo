import { type PropsWithChildren, useState } from 'react'

import { App as AntdApp } from 'antd'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AntdApp>{children}</AntdApp>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
