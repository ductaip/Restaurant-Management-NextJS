import authApi from "@/apis/auth"
import { useMutation } from "@tanstack/react-query"

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: authApi.login
    })
}