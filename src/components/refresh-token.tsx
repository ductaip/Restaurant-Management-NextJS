'use client'

import { checkAndRefreshToken } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react" 

const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']

export default function RefreshToken() {
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        if(UNAUTHENTICATED_PATH.includes(pathname)) return
        let interval: any = null 
        //Must call for first time, as interval will run after TIMEOUT
        checkAndRefreshToken({
            onError: () => {
                clearInterval(interval)
                router.push('/login')
            }
        }) 

        const TIMEOUT = 1000
        interval = setInterval(() => checkAndRefreshToken({
            onError: () => {
                clearInterval(interval)
                router.push('/login')
            }
        }), TIMEOUT)

        return () => clearInterval(interval)
    }, [pathname, router])
    return null 
}