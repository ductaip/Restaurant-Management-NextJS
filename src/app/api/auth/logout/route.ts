import authApi from "@/apis/auth"
import { LoginBodyType, LogoutBodyType } from "@/schemas/auth.schema"
import { cookies } from "next/headers"
import { HttpError } from "@/lib/http"

 
export async function POST(request: Request) { 
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value as string
    const refreshToken = cookieStore.get('refreshToken')?.value as string
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')

    if(!accessToken || !refreshToken) {
        console.log(accessToken, '>>>', refreshToken)
        return Response.json({
            message: 'Missing accessToken or refreshToken'
        }, {
            status: 200
        })
    }

    try { 
        const result = await authApi.sLogout({accessToken, refreshToken}) 

        return Response.json(result.payload)
    } catch (error) { 
        return Response.json(
            {message: `It's a error happing on logout`}, 
            {status: 200}
        )
    }
   
}