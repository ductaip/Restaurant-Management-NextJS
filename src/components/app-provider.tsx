'use client'
import { 
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RefreshToken from './refresh-token'

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
            <RefreshToken />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>)
}