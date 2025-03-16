'use client'

import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import jwt from 'jsonwebtoken'
import authApi from "@/apis/auth"

const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']

export default function RefreshToken() {
    const pathname = usePathname()
    console.log('>>>',pathname)
    useEffect(() => {
        if(UNAUTHENTICATED_PATH.includes(pathname)) return
        let interval: any = null
        const checkAndRefreshToken = async () => {
            //check xem token còn hạn ko, 
            // ko nên đưa ra khỏi hàm.
            const accessToken = getAccessTokenFromLocalStorage()
            const refreshToken = getRefreshTokenFromLocalStorage()
            if(!accessToken || !refreshToken) return
            const decodeAccessToken = jwt.decode(accessToken) as {
                exp: number
                iat: number
            }
            const decodeRefreshToken = jwt.decode(refreshToken) as {
                exp: number
                iat: number
            }
            //exp của token tính theo giây, new Date().getTime() thì ms
            const now = Math.round(new Date().getTime() / 1000) 
            //refreshToken is expire then stop
            if(decodeRefreshToken.exp <= now) return
            // example if access token has expire time that is 1h
            // check if there is 1/3 time (20p) left then refresh-token again
            // **leftTime = decodeAccessToken.exp - now 
            // **expTime = decodeAccessToken.exp - decodeAccessToken.iat
            if(decodeAccessToken.exp - now < (decodeAccessToken.exp - decodeAccessToken.iat) / 3) {
                //call refreshtoken api
                try {
                    const result = await authApi.refreshToken()
                    // setAcc
                } catch (error) {
                    
                }
            }


        }
    }, [pathname])
    return null 
}