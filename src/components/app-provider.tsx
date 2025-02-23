'use client'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  
  // Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        },
      },
})

export default function AppProvider({ children }: {
    children: React.ReactNode
}) {
    return (<QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>)
}