import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";
import { toast } from "sonner";
import jwt from "jsonwebtoken";
import authApi from "@/apis/auth";
import { DishStatus, OrderStatus, Role, TableStatus } from "@/constants/type";
import envConfig from "@/config";
import { TokenPayload } from "@/types/jwt.types";
import guestApi from "@/apis/guest";
import { format } from "date-fns";
import { BookX, CookingPot, HandCoins, Loader, Truck } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast(error?.payload?.message ?? "Error is not known");
  }
};

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("accessToken") : null;

export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("refreshToken") : null;

export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser ? localStorage.setItem("accessToken", value) : null;

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser ? localStorage.setItem("refreshToken", value) : null;

export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("accessToken");
  isBrowser && localStorage.removeItem("refreshToken");
};

export const checkAndRefreshToken = async (param?: {
  onError?: () => void;
  onSuccess?: () => void;
}) => {
  //check xem token còn hạn ko,
  // ko nên đưa ra khỏi hàm.
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  if (!accessToken || !refreshToken) return;

  const decodeAccessToken = decodeToken(accessToken);

  const decodeRefreshToken = decodeToken(refreshToken);
  //exp của token tính theo giây, new Date().getTime() thì ms
  //set cookie bi lech, vi the tru hao 1s
  const now = new Date().getTime() / 1000 - 1;

  //refreshToken is expire then logout
  if (decodeRefreshToken.exp <= now) {
    removeTokensFromLocalStorage();
    return param?.onError && param.onError();
  }
  // example if access token has expire time that is 1h
  // check if there is 1/3 time (20p) left then refresh-token again
  // **leftTime = decodeAccessToken.exp - now
  // **expTime = decodeAccessToken.exp - decodeAccessToken.iat
  if (
    decodeAccessToken.exp - now <
    (decodeAccessToken.exp - decodeAccessToken.iat) / 3
  ) {
    //call refreshtoken api
    try {
      const role = decodeRefreshToken.role;
      const result =
        role === Role.Guest
          ? await guestApi.refreshToken()
          : await authApi.refreshToken();
      // console.log("####", result.payload.data.accessToken);
      setAccessTokenToLocalStorage(result.payload.data.accessToken);
      setRefreshTokenToLocalStorage(result.payload.data.refreshToken);
      param?.onSuccess && param.onSuccess();
    } catch (error) {
      param?.onError && param.onError();
    }
  }
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const getVietnameseDishStatus = (
  status: (typeof DishStatus)[keyof typeof DishStatus]
) => {
  switch (status) {
    case DishStatus.Available:
      return "Có sẵn";
    case DishStatus.Unavailable:
      return "Không có sẵn";
    default:
      return "Ẩn";
  }
};

export const getVietnameseOrderStatus = (
  status: (typeof OrderStatus)[keyof typeof OrderStatus]
) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "Đã phục vụ";
    case OrderStatus.Paid:
      return "Đã thanh toán";
    case OrderStatus.Pending:
      return "Chờ xử lý";
    case OrderStatus.Processing:
      return "Đang nấu";
    default:
      return "Từ chối";
  }
};

export const getVietnameseTableStatus = (
  status: (typeof TableStatus)[keyof typeof TableStatus]
) => {
  switch (status) {
    case TableStatus.Available:
      return "Có sẵn";
    case TableStatus.Reserved:
      return "Đã đặt";
    default:
      return "Ẩn";
  }
};

export const getTableLink = ({
  token,
  tableNumber,
}: {
  token: string;
  tableNumber: number;
}) => {
  return (
    envConfig.NEXT_PUBLIC_URL + "/tables/" + tableNumber + "?token=" + token
  );
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};

export function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const simpleMatchText = (fullText: string, matchText: string) => {
  return removeAccents(fullText.toLowerCase()).includes(
    removeAccents(matchText.trim().toLowerCase())
  );
};

export const formatDateTimeToLocaleString = (date: string | Date) => {
  return format(
    date instanceof Date ? date : new Date(date),
    "HH:mm:ss dd/MM/yyyy"
  );
};

export const formatDateTimeToTimeString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), "HH:mm:ss");
};

export const OrderStatusIcon = {
  [OrderStatus.Pending]: Loader,
  [OrderStatus.Processing]: CookingPot,
  [OrderStatus.Rejected]: BookX,
  [OrderStatus.Delivered]: Truck,
  [OrderStatus.Paid]: HandCoins,
};
