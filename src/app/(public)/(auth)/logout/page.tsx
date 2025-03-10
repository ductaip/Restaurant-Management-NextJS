'use client'

import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function LogoutPage() {
    const {mutateAsync} = useLogoutMutation()
    const router = useRouter()
    const ref = useRef<any>(null)
    useEffect(() => {
        if(ref.current) return
        ref.current = mutateAsync
        mutateAsync().then((res) => {
            setTimeout(() => {
                ref.current = null
            }, 1000)
            router.push('/login')
        })
    }, [mutateAsync])
    return (
      <div>
        Logout Page
      </div>
    )
}
