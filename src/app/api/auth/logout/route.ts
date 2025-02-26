import authApi from "@/apis/auth"
import { cookies } from "next/headers"

 
export async function POST(request: Request) { 
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value as string
    const refreshToken = cookieStore.get('refreshToken')?.value as string
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')

    if(!accessToken || !refreshToken) {
        console.log(accessToken, '>>>', refreshToken)
        return Response.json({
            message: 'AccessToken hoặc RefreshToken bị thiếu'
        }, {
            status: 200
        })
    }

    try { 
        const result = await authApi.sLogout({accessToken, refreshToken}) 

        return Response.json(result.payload)
    } catch (error) { 
        return Response.json(
            {message: `Có lỗi xảy ra trong quá trình logout`}, 
            {status: 200}
        )
    }
   
}