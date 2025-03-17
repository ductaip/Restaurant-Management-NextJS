'use client'

import { useAppContext } from "@/components/app-provider"
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "@/lib/utils"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef } from "react"

function Logout() {
  const searchParams = useSearchParams()
    const refreshTokenFromUrl = searchParams.get('refreshToken')
    const accessTokenFromUrl = searchParams.get('accessToken')
    const {mutateAsync} = useLogoutMutation()
    const router = useRouter()
    const ref = useRef<any>(null)
    const {handleSetIsAuth} = useAppContext()

    useEffect(() => {
        if(
          !ref.current (
          (refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) || 
          (accessTokenFromUrl && accessTokenFromUrl !== getAccessTokenFromLocalStorage())
        ) 
        ) {
          ref.current = mutateAsync
          mutateAsync().then((res) => {
              setTimeout(() => {
                  ref.current = null
              }, 1000)
              handleSetIsAuth(false)
              router.push('/login')
          })
        } else router.push('/')
        
    }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl, handleSetIsAuth])
    return (
      <div>
        Logout......
      </div>
    )
}

export default function LogoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Logout />
    </Suspense>
  )
}
