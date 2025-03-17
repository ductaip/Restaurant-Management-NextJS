import http from '@/lib/http'
import {
  CreateDishBodyType,
  DishListResType,
  DishResType,
  UpdateDishBodyType
} from '@/schemas/dish.schema'

const dishApi = {
  /**
   * Lấy danh sách tất cả món ăn
   * @returns Promise<DishListResType>
   */
    getAllDishes: () => http.get<DishListResType>('dishes', { next: { tags: ['dishes'] } }),

  /**
   * Thêm một món ăn mới
   * @param CreateDishBodyType Thông tin món ăn cần tạo
   * @returns Promise<DishResType>
   */
    createDish: (body: CreateDishBodyType) => http.post<DishResType>('dishes', body),

  /**
   * Lấy thông tin một món ăn theo ID
   * @param id ID của món ăn
   * @returns Promise<DishResType>
   */
    getDishById: (id: number) => http.get<DishResType>(`dishes/${id}`),

  /**
   * Cập nhật thông tin một món ăn theo ID
   * @param id ID của món ăn
   * @param UpdateDishBodyType Dữ liệu cập nhật món ăn
   * @returns Promise<DishResType>
   */
    updateDish: (id: number, body: UpdateDishBodyType) => http.put<DishResType>(`dishes/${id}`, body),

  /**
   * Xóa một món ăn theo ID
   * @param id ID của món ăn
   * @returns Promise<DishResType>
   */
    deleteDish: (id: number) => http.delete<DishResType>(`dishes/${id}`)
}

export default dishApi
