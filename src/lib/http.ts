/* eslint-disable @typescript-eslint/no-explicit-any */

import envConfig from "@/config"
import { LoginResType } from "@/schemas/auth.schema"
import { redirect } from "next/navigation"

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
    message: string
    errors: {
        field: string
        message: string
    }[]
}

export class HttpError extends Error {
    status: number
    payload: {
        message: string
        [key: string]: any
    }
    constructor({status, payload} : {status: number, payload: any}) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: 422
    payload: EntityErrorPayload
    constructor({status, payload}: {status: 422, payload: EntityErrorPayload}) {
        super({status, payload})
        this.status = status
        this.payload = payload
    }
}

// class SessionToken {
//     private token = ''
//     get value() {
//         return this.token
//     }

//     set value(token: string) {
//         //ko the goi o server component
//         if(typeof window === 'undefined') {
//             throw new Error('Cannot set token on server component')
//         }
//         this.token = token
//     }
// }

// export const clientSessionToken = new SessionToken()

export const isClient = () => typeof window !== 'undefined'

let clientLogoutRequest: null | Promise<any> = null

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {

    let body: FormData | string | undefined = undefined
    if (options?.body instanceof FormData) {
        body = options.body
    } else if (options?.body) {
        body = JSON.stringify(options.body)
    } 

    const baseHeaders: {
        [key: string] : string
    } = body instanceof FormData ? {} : {
        'Content-Type': 'application/json'
    }

    if(isClient()) {
        const sessionToken = localStorage.getItem('sessionToken')
        if(sessionToken) {
            baseHeaders.Authorization = `Bearer ${sessionToken}`
        }
    }  



    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method
    })

    const payload: Response = await res.json()
    const data = {
        status: res.status,
        payload
    }

    if(!res.ok) {
        if(res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(data as {
                status: 422,
                payload: EntityErrorPayload
            })
            //handle 401 token is expired
        } else if(res.status === AUTHENTICATION_ERROR_STATUS) {
            if(isClient()) {
                if(!clientLogoutRequest) {
                    clientLogoutRequest = fetch('/api/auth/logout', {
                        method: 'POST',
                        body: JSON.stringify({ force: true }),
                        headers: {
                            
                        }
                    })

                    try {
                        await clientLogoutRequest

                    } catch(error) {
                        console.log(error)
                    } finally {
                        localStorage.removeItem('sessionToken')
                        localStorage.removeItem('sessionTokenExpiresAt')
                        clientLogoutRequest = null
                        location.href = '/login'
                    }
                    
                }
            } else {
                const sessionToken = (options?.headers as any)?.Authorization.split(' ')[1]
                redirect(`/logout?sessionToken=${sessionToken}`)
            }
        } else {
            throw new HttpError(data)
        }
    }
    
    if(isClient()) {
        const check = ['/auth/register', '/auth/login'].some(path => path.startsWith(url))
        const checkLogout = ['/auth/logout'].some(path => path.startsWith(url))

        if(check) {
            const {token, expiresAt} = (payload as LoginResType).data
            localStorage.setItem('sessionToken', token)
            localStorage.setItem('sessionTokenExpiresAt', expiresAt)
        } else if(checkLogout) {
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('sessionTokenExpiresAt')
        }
    }

    return data
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options)
    },

    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, {...options, body})
    },

    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>| undefined) {
        return request<Response>('PUT', url, {...options, body})
    },

    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, {...options})
    }
}

export default http