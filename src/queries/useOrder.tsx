import orderApi from "@/apis/order";
import { UpdateOrderBodyType } from "@/schemas/order.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: ({
      orderId,
      ...body
    }: UpdateOrderBodyType & { orderId: number }) =>
      orderApi.updateOrder(orderId, body),
  });
};

export const useGetOrderListQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApi.getOrderList({}),
  });
};
