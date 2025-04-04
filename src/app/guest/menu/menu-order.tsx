"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDishListQuery } from "@/queries/useDish";
import Quantity from "./quantity";
import { useState } from "react";
import { GuestCreateOrdersBodyType } from "@/schemas/guest.schema";
import { useGuestOrderMutation } from "@/queries/useGuest";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

export default function MenuOrder() {
  const { data: listData } = useDishListQuery();
  const dishes = listData?.payload.data ?? [];
  const { mutateAsync } = useGuestOrderMutation();
  const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([]);
  const totalPrice = dishes.reduce((result, dish) => {
    const order = orders.find((order) => order.dishId === dish.id);
    if (!order) return result;
    return result + order.quantity * dish.price;
  }, 0);
  const router = useRouter();
  const handleQuantityChange = (dishId: number, quantity: number) => {
    setOrders((prev) => {
      if (quantity === 0) {
        return prev.filter((order) => order.dishId !== dishId);
      }
      const index = prev.findIndex((order) => order.dishId === dishId);
      if (index === -1) {
        return [...prev, { dishId, quantity }];
      }

      const newOrders = [...prev];
      newOrders[index] = { ...newOrders[index], quantity };
      return newOrders;
    });
  };

  const handleOrder = async () => {
    try {
      await mutateAsync(orders);
      router.push(`/guest/orders`);
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };

  return (
    <>
      {dishes
        .filter((item) => item.status !== "Hidden")
        .map((dish) => (
          <div
            key={dish.id}
            className={`flex gap-4 ${
              dish.status === "Unavailable"
                ? "pointer-events-none opacity-80"
                : ""
            }`}
          >
            <div className="flex-shrink-0 relative">
              <span className="absolute inset-0 flex items-center justify-center text-md font-bold">
                {dish.status === "Unavailable" ? "Hết hàng" : ""}
              </span>
              <Image
                src={dish.image}
                alt={dish.name}
                height={100}
                width={100}
                quality={100}
                className={`object-cover w-[80px] h-[80px] rounded-md ${
                  dish.status === "Unavailable" ? "opacity-40" : ""
                }`}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">{dish.name}</h3>
              <p className="text-xs">{dish.description}</p>
              <p className="text-xs font-semibold">
                {dish.price.toLocaleString("VN")}đ
              </p>
            </div>
            <div className="flex-shrink-0 ml-auto flex justify-center items-center">
              <Quantity
                onChange={(value) => handleQuantityChange(dish.id, value)}
                value={
                  orders.find((order) => order.dishId === dish.id)?.quantity ??
                  0
                }
              />
            </div>
          </div>
        ))}
      <div className="sticky bottom-0">
        <Button
          className="w-full justify-between"
          onClick={handleOrder}
          disabled={orders.length === 0}
        >
          <span>Đặt hàng · {orders.length} món</span>
          <span>{totalPrice && totalPrice.toLocaleString("VN")}đ</span>
        </Button>
      </div>
    </>
  );
}
