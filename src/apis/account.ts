import http from '@/lib/http'
import { AccountResType, UpdateMeBodyType } from '@/schemas/account.schema'

const accountApi = {
    getPersonalAccount: () => http.get<AccountResType>('/accounts/me'),
    updatePersonalAccount: (body: UpdateMeBodyType) => http.put<AccountResType>('/accounts/me', body)
}

export default accountApi