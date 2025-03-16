import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { toast } from "sonner"
import jwt from 'jsonwebtoken'
import authApi from "@/apis/auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({error, setError} : {
  error: any
  setError?: UseFormSetError<any>
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(item => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast(error?.payload?.message ?? 'Error is not known')
  }
}

const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => isBrowser ? localStorage.getItem('accessToken') : null
 

export const getRefreshTokenFromLocalStorage = () =>  isBrowser ? localStorage.getItem('refreshToken') : null
 
export const setAccessTokenToLocalStorage = (value: string) => isBrowser ? localStorage.setItem('accessToken', value) : null

export const setRefreshTokenToLocalStorage = (value: string) => isBrowser ? localStorage.setItem('refreshToken', value) : null


export const checkAndRefreshToken = async (param?:{
  onError?: () => void
  onSuccess?: () => void
}) => {
  console.log('>>>')
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
          console.log('####',result.payload.data.accessToken)
          setAccessTokenToLocalStorage(result.payload.data.accessToken)
          setRefreshTokenToLocalStorage(result.payload.data.refreshToken)
          param?.onSuccess && param.onSuccess()
      } catch (error) {
          param?.onError && param.onError()
      }
  }


}