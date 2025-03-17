'use client'

import { checkAndRefreshToken, getRefreshTokenFromLocalStorage } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

function RefreshToken() {
  const searchParams = useSearchParams()
  const refreshTokenFromUrl = searchParams.get('refreshToken') 
  const redirectPathname = searchParams.get('redirect') 
  const router = useRouter()
  useEffect(() => {
      if( refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) {
        checkAndRefreshToken({
            onSuccess: () => {
                router.push(redirectPathname || '/')
            }
            //onError: () => {}   ko can xu ly, vi da handle o http
        })
      } else router.push('/')
      
  }, [ router, refreshTokenFromUrl, redirectPathname ])
  return (
    <div>
      Refresh token......
    </div>
  )
}

export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RefreshToken />
    </Suspense>
  )
}
