import http from '@/lib/http'
import { AccountResType } from '@/schemas/account.schema'

const accountApi = {
    getAccount: () => http.get<AccountResType>('/accounts/me')
}

export default accountApi