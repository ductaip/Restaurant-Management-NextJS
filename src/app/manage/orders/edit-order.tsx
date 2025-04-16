"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateOrderBody, UpdateOrderBodyType } from "@/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getVietnameseOrderStatus } from "@/lib/utils";
import { OrderStatus, OrderStatusValues } from "@/constants/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DishesDialog } from "@/app/manage/orders/dishes-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { DishListResType } from "@/schemas/dish.schema";

const fakeOrderDetail = {
  id: 30,
  guestId: 70,
  guest: {
    id: 70,
    name: "An",
    tableNumber: 2,
    createdAt: "2024-07-11T04:30:32.728Z",
    updatedAt: "2024-07-11T05:00:34.131Z",
  },
  tableNumber: 2,
  dishSnapshotId: 36,
  dishSnapshot: {
    id: 36,
    name: "Spaghetti 5",
    price: 50000,
    image: "http://localhost:4000/static/e0001b7e08604e0dbabf0d8f95e6174a.jpg",
    description: "Mỳ ý",
    status: "Available",
    dishId: 2,
    createdAt: "2024-07-11T04:30:57.450Z",
    updatedAt: "2024-07-11T04:30:57.450Z",
  },
  quantity: 1,
  orderHandlerId: null,
  orderHandler: null,
  status: "Paid",
  createdAt: "2024-07-11T04:30:57.450Z",
  updatedAt: "2024-07-11T04:31:38.806Z",
  table: {
    number: 2,
    capacity: 10,
    status: "Reserved",
    token: "667f3b1ce5e4429990dacea1809d20e7",
    createdAt: "2024-06-21T06:52:26.847Z",
    updatedAt: "2024-07-03T04:36:51.130Z",
  },
};

export default function EditOrder({
  id,
  setId,
  onSubmitSuccess,
}: {
  id?: number | undefined;
  setId: (value: number | undefined) => void;
  onSubmitSuccess?: () => void;
}) {
  const [selectedDish, setSelectedDish] = useState<DishListResType["data"][0]>(
    fakeOrderDetail.dishSnapshot as any
  );
  const orderDetail = fakeOrderDetail;
  const form = useForm<UpdateOrderBodyType>({
    resolver: zodResolver(UpdateOrderBody),
    defaultValues: {
      status: OrderStatus.Pending,
      dishId: 0,
      quantity: 1,
    },
  });

  const onSubmit = async (values: UpdateOrderBodyType) => {};

  const reset = () => {
    setId(undefined);
  };

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật đơn hàng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="edit-order-form"
            onSubmit={form.handleSubmit(onSubmit, console.log)}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="dishId"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <FormLabel>Món ăn</FormLabel>
                    <div className="flex items-center col-span-2 space-x-4">
                      <Avatar className="aspect-square w-[50px] h-[50px] rounded-md object-cover">
                        <AvatarImage src={selectedDish?.image} />
                        <AvatarFallback className="rounded-none">
                          {selectedDish?.name}
                        </AvatarFallback>
                      </Avatar>
                      <div>{selectedDish?.name}</div>
                    </div>

                    <DishesDialog
                      onChoose={(dish) => {
                        field.onChange(dish.id);
                        setSelectedDish(dish);
                      }}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="quantity">Số lượng</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input
                          id="quantity"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="w-16 text-center"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            let value = e.target.value;
                            const numberValue = Number(value);
                            if (isNaN(numberValue)) {
                              return;
                            }
                            field.onChange(numberValue);
                          }}
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <FormLabel>Trạng thái</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl className="col-span-3">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Trạng thái" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {OrderStatusValues.map((status) => (
                            <SelectItem key={status} value={status}>
                              {getVietnameseOrderStatus(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="edit-order-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
