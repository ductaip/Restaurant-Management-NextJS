"use client";

import { Badge } from "@/components/ui/badge";
import { useGuestGetOrderListMutation } from "@/queries/useGuest";
import Image from "next/image";

export default function OrdersCart() {
  const { data } = useGuestGetOrderListMutation();
  const orders = data?.payload.data ?? [];
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
        </div>
      ))}
    </div>
  );
}
