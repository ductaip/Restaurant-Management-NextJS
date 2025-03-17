'use client'
import { 
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RefreshToken from './refresh-token'
import { createContext, useContext, useEffect, useState } from 'react'
import { getAccessTokenFromLocalStorage, removeTokensFromLocalStorage } from '@/lib/utils'

  // Create a client
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        },
      },
})

const AppContext = createContext({
    isAuth: false,
    handleSetIsAuth: (isAuth: boolean) => {}
})

export const useAppContext = () => {
    return useContext(AppContext)
}

export default function AppProvider({ children }: {
    children: React.ReactNode
}) {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const accessToken = getAccessTokenFromLocalStorage()
        if(accessToken) setIsAuth(true)
    }, [])

    const handleSetIsAuth = (isAuth: boolean) => {
        if(isAuth) setIsAuth(true)
        else {
            setIsAuth(false)
            removeTokensFromLocalStorage()
        }
    }
    //react19 and nextjs 15 don't need AppContext.Provider
    return (
      <AppContext value={{isAuth, handleSetIsAuth}}>
        <QueryClientProvider client={queryClient}>
            {children}
            <RefreshToken />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppContext>
    )
}