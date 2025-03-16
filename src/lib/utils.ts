import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { toast } from "sonner"

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