import authApi from "@/apis/auth"
import { LoginBodyType } from "@/schemas/auth.schema"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import { HttpError } from "@/lib/http"

 
export async function POST(request: Request) { 
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if(!refreshToken) {
        return Response.json({
            message: 'Không tìm thấy refreshToken'
        }, {
            status: 401
        })
    }
    try { 
        const {payload} = await authApi.sRefreshToken({refreshToken})
        
        //Nhận acc và refreshToken mới thì set mã hóa lại ra..
        const decodeAccessToken = jwt.decode(payload.data.accessToken) as {exp: number}
        const decodeRefreshToken = jwt.decode(payload.data.refreshToken) as {exp: number}

        //set cái mới vào cookie
        cookieStore.set('accessToken', payload.data.accessToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: decodeAccessToken.exp * 1000
        })
        //set mới vào cookie
        cookieStore.set('refreshToken', payload.data.refreshToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: decodeRefreshToken.exp * 1000
        })

        return Response.json(payload)
    } catch (error: any) { 
        return Response.json({message: error.message ?? `Có lỗi xảy ra khi login`}, {status: 401})
    }
   
}