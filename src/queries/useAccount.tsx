import accountApi from "@/apis/account"
import { useQuery } from "@tanstack/react-query"

export const useAccountProfile = () => {
    return useQuery({
        queryKey: ['account-profile'],
        queryFn: accountApi.getAccount
    })
}