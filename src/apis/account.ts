import http from '@/lib/http'
import { AccountResType, ChangePasswordBodyType, UpdateMeBodyType } from '@/schemas/account.schema'

const accountApi = {
    getPersonalAccount: () => http.get<AccountResType>('/accounts/me'),
    updatePersonalAccount: (body: UpdateMeBodyType) => http.put<AccountResType>('/accounts/me', body),
    changePassword: (body: ChangePasswordBodyType) => http.put<AccountResType>('/accounts/change-password', body) 
}

export default accountApi