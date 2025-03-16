'use client'

import { checkAndRefreshToken } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useEffect } from "react" 

const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']

export default function RefreshToken() {
    const pathname = usePathname()
    useEffect(() => {
        if(UNAUTHENTICATED_PATH.includes(pathname)) return
        let interval: any = null 
        //Must call for first time, as interval will run after TIMEOUT
        checkAndRefreshToken({
            onError: () => clearInterval(interval)
        }) 

        const TIMEOUT = 1000
        interval = setInterval(checkAndRefreshToken, TIMEOUT)

        return () => clearInterval(interval)
    }, [pathname])
    return null 
}