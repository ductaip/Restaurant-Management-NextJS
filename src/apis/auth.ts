import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemas/auth.schema";

const authApi = {
    sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
    login: (body: LoginBodyType) => http.post<LoginResType>('/api/auth/login', body, {
        baseUrl: ''
    }),
}

export default authApi