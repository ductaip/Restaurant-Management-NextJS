'use client'

import { checkAndRefreshToken, getRefreshTokenFromLocalStorage } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function RefreshTokenPage() {
    const searchParams = useSearchParams()
    const refreshTokenFromUrl = searchParams.get('refreshToken') 
    const redirectPathname = searchParams.get('redirect') 
    const router = useRouter()
    useEffect(() => {
        if( refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) 
            checkAndRefreshToken({
                onSuccess: () => {
                    router.push(redirectPathname || '/')
                }
                //onError: () => {}   ko can xu ly, vi da handle o http
            })
        
    }, [ router, refreshTokenFromUrl, redirectPathname ])
    return (
      <div>
        Refresh token......
      </div>
    )
}
