import http from "@/lib/http";
import { LoginBodyType, LoginResType, LogoutBodyType } from "@/schemas/auth.schema";

const authApi = {
    sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
    login: (body: LoginBodyType) => http.post<LoginResType>('/api/auth/login', body, {
        baseUrl: ''
    }),

    //logout server need to pass accessToken on headers
    sLogout: (body: LogoutBodyType & {
        accessToken: string
    }) => http.post('/auth/logout', {refreshToken: body.refreshToken}, {
        headers: {
            Authorization: `Bearer ${body.accessToken}`
        }
    }),
    logout: () => http.post('/api/auth/logout', null, {baseUrl: ''})
}

export default authApi