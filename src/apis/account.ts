import http from '@/lib/http'
import { AccountListResType, AccountResType, ChangePasswordBodyType, CreateEmployeeAccountBodyType, UpdateEmployeeAccountBodyType, UpdateMeBodyType } from '@/schemas/account.schema'

const PREFIX_ACCOUNT = '/accounts'

const accountApi = {
     /**
     * Lấy thông tin tài khoản cá nhân (dùng mặc định từ http)
     * @returns Promise<AccountResType>
     */
    getPersonalAccount: () => http.get<AccountResType>(`${PREFIX_ACCOUNT}/me`),

    /**
     * Lấy thông tin tài khoản cá nhân với accessToken truyền vào
     * @param accessToken Token xác thực
     * @returns Promise<AccountResType>
     */
    sGetPersonalAccount: (accessToken: string) => http.get<AccountResType>(`${PREFIX_ACCOUNT}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }),

    /**
     * Cập nhật thông tin cá nhân
     * @param UpdateMeBodyType Dữ liệu cập nhật thông tin tài khoản
     * @returns Promise<AccountResType>
     */
    updatePersonalAccount: (body: UpdateMeBodyType) => http.put<AccountResType>(`${PREFIX_ACCOUNT}/me`, body),

    /**
     * Đổi mật khẩu tài khoản
     * @param ChangePasswordBodyType Dữ liệu đổi mật khẩu
     * @returns Promise<AccountResType>
     */
    changePassword: (body: ChangePasswordBodyType) => http.put<AccountResType>(`${PREFIX_ACCOUNT}/change-password`, body),

    /**
     * Lấy thông tin toàn bộ tài khoản 
     * @returns Promise<AccountListResType>
     */
    getListAccount: () => http.get<AccountListResType>(`${PREFIX_ACCOUNT}`),

    /**
     * Tạo tài khoản nhân viên 
     * @param CreateEmployeeAccountBodyType Dữ liệu cập nhật thông tin tài khoản
     * @returns Promise<AccountResType>
     */
    createEmployee: (body: CreateEmployeeAccountBodyType) => http.post<AccountResType>(PREFIX_ACCOUNT, body),

    /**
     * Tạo tài khoản nhân viên 
     * @param UpdateEmployeeAccountBodyType Dữ liệu cập nhật thông tin tài khoản
     * @returns Promise<AccountResType>
     */
    updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) => http.put<AccountResType>(`${PREFIX_ACCOUNT}/detail/${id}`, body),

    getEmployeeDetail: (id: number) => http.get<AccountResType>(`${PREFIX_ACCOUNT}/detail/${id}`),

    deleteEmployee: (id: number) => http.delete<AccountResType>(`${PREFIX_ACCOUNT}/detail/${id}`)

}

export default accountApi