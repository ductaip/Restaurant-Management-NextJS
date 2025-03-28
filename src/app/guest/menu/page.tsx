import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// fake data
const dishes = [
  {
    id: 1,
    name: "Pizza hải sản",
    description: "Pizza hải sản ngon nhất thế giới",
    price: 100000,
    image: "http://localhost:4000/static/c306dc5bbf594658a22084d949f6f34b.jpeg",
  },
  {
    id: 2,
    name: "Pizza thịt bò",
    description: "Pizza thịt bò ngon nhất thế giới",
    price: 150000,
    image: "http://localhost:4000/static/c30a77f54b0f4e4b93197d89ac7e67d9.jpeg",
  },
];
export default async function MenuPage() {
  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">🍕 Menu quán</h1>
      {dishes.map((dish) => (
        <div key={dish.id} className="flex gap-4">
          <div className="flex-shrink-0">
            <Image
              src={dish.image}
              alt={dish.name}
              height={100}
              width={100}
              quality={100}
              className="object-cover w-[80px] h-[80px] rounded-md"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm">{dish.name}</h3>
            <p className="text-xs">{dish.description}</p>
            <p className="text-xs font-semibold">2,200,000 đ</p>
          </div>
          <div className="flex-shrink-0 ml-auto flex justify-center items-center">
            <div className="flex gap-1 ">
              <Button className="h-6 w-6 p-0">
                <Minus className="w-3 h-3" />
              </Button>
              <Input type="text" readOnly className="h-6 p-1 w-8" />
              <Button className="h-6 w-6 p-0">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="sticky bottom-0">
        <Button className="w-full justify-between">
          <span>Giỏ hàng · 2 món</span>
          <span>100,000 đ</span>
        </Button>
      </div>
    </div>
  );
}
