import guestApi from "@/apis/guest";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGuestLoginMutation = () => {
  return useMutation({
    mutationFn: guestApi.login,
  });
};

export const useGuestLogoutMutation = () => {
  return useMutation({
    mutationFn: guestApi.logout,
  });
};

export const useGuestOrderMutation = () => {
  return useMutation({
    mutationFn: guestApi.order,
  });
};

export const useGuestGetOrderListMutation = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: guestApi.getOrderList,
  });
};
