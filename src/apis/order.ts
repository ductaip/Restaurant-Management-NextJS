import http from "@/lib/http";
import {
  GetOrdersQueryParamsType,
  GetOrdersResType,
  UpdateOrderBodyType,
  UpdateOrderResType,
} from "@/schemas/order.schema";
import queryString from "query-string";

const orderApi = {
  getOrderList: (queryParams: GetOrdersQueryParamsType) =>
    http.get<GetOrdersResType>(
      "/orders?" +
        queryString.stringify({
          fromDate: queryParams.fromDate?.toISOString(),
          toDate: queryParams.toDate?.toISOString(),
        })
    ),

  updateOrder: (orderId: number, body: UpdateOrderBodyType) =>
    http.put<UpdateOrderResType>(`/orders/${orderId}`, body),
};

export default orderApi;
