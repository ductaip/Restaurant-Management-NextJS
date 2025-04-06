"use client";

import { Badge } from "@/components/ui/badge";
import socket from "@/lib/socket";
import { getVietnameseOrderStatus } from "@/lib/utils";
import { useGuestGetOrderListMutation } from "@/queries/useGuest";
import {
  PayGuestOrdersResType,
  UpdateOrderResType,
} from "@/schemas/order.schema";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export default function OrdersCart() {
  const { refetch, data } = useGuestGetOrderListMutation();
  const orders = useMemo(() => data?.payload.data ?? [], [data]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socket.id);
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    function onUpdateOrder(data: UpdateOrderResType["data"]) {
      const {
        dishSnapshot: { name },
        quantity,
      } = data;
      toast(
        `Món ${name} (SL: ${quantity}) vừa được cập nhật sang trạng thái "${getVietnameseOrderStatus(
          data.status
        )}"`
      );
      refetch();
    }

    function onPayment(data: PayGuestOrdersResType["data"]) {
      const { guest } = data[0];
      toast(
        `${guest?.name} tại bàn ${guest?.tableNumber} thanh toán thành công ${data.length} đơn`
      );
      refetch();
    }

    socket.on("update-order", onUpdateOrder);
    socket.on("payment", onPayment);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update-order", onUpdateOrder);
      socket.off("payment", onPayment);
    };
  }, [refetch]);
  return (
    <div>
      {orders.map((order) => (
        <div key={order.dishSnapshot.id} className="flex gap-4 mt-8">
          <div className="flex-shrink-0 relative">
            <span className="absolute inset-0 flex items-center justify-center text-md font-bold">
              {order.dishSnapshot.status === "Unavailable" ? "Hết hàng" : ""}
            </span>
            <Image
              src={order.dishSnapshot.image}
              alt={order.dishSnapshot.name}
              height={100}
              width={100}
              quality={100}
              className={`object-cover w-[80px] h-[80px] rounded-md ${
                order.dishSnapshot.status === "Unavailable" ? "opacity-40" : ""
              }`}
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm">{order.dishSnapshot.name}</h3>
            <div className="text-xs font-semibold">
              {order.dishSnapshot.price.toLocaleString("VN")}đ x
              <Badge className="px-1.5 ml-2"> {order.quantity}</Badge>
            </div>
          </div>
          <div className="flex-shrink-0 ml-auto flex justify-center items-center">
            <Badge variant={"outline"}>
              {getVietnameseOrderStatus(order.status)}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
