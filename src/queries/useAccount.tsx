import accountApi from "@/apis/account"
import { AccountResType } from "@/schemas/account.schema"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAccountProfile = () => {
    return useQuery({
        queryKey: ['account-profile'],
        queryFn: accountApi.getPersonalAccount 
    })
}

export const useUpdatePersonalProfileMutation = () => {
    return useMutation({
        mutationFn: accountApi.updatePersonalAccount
    })
}

export const useChangePasswordMutation = () => {
    return useMutation({
        mutationFn: accountApi.changePassword
    })
}