import http from '@/lib/http'
import {
  CreateTableBodyType,
  TableListResType,
  TableResType,
  UpdateTableBodyType
} from '@/schemas/table.schema'

const tableApi = {
  /**
   * Lấy thông tin toàn bộ bàn ăn 
   * @returns Promise<TableListResType>
   */
  getListTables: () => http.get<TableListResType>('tables'),

  /**
   * Tạo bàn ăn mới
   * @param CreateTableBodyType 
   * @returns Promise<TableResType>
   */
  createTable: (body: CreateTableBodyType) => http.post<TableResType>('tables', body),

    /**
   * Lấy thông tin bàn ăn cụ thể theo ID
   * @param id ID của bàn ăn 
   * @returns Promise<TableResType>
   */
  getTableById: (id: number) => http.get<TableResType>(`tables/${id}`),

    /**
   * Cập nhật thông tin một bàn ăn theo ID
   * @param id ID của bàn ăn
   * @param UpdateTableBodyType Dữ liệu cập nhật món ăn
   * @returns Promise<TableResType>
   */
  updateTable: (id: number, body: UpdateTableBodyType) => http.put<TableResType>(`tables/${id}`, body),

    /**
   * Xóa thông tin bàn ăn theo id
   * @param id ID của bàn ăn 
   * @returns Promise<TableResType>
   */
  deleteTable: (id: number) => http.delete<TableResType>(`tables/${id}`)
}

export default tableApi
