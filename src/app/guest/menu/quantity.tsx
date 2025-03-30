import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";

export default function Quantity({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div className="flex gap-1 ">
      <Button
        className="h-6 w-6 p-0"
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="w-3 h-3" />
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="h-6 p-1 w-8 text-center"
        value={value}
        onChange={(e) => {
          let value = e.target.value;
          const numberValue = Number(value);
          if (!numberValue) {
            return;
          }
          onChange(numberValue);
        }}
      />
      <Button className="h-6 w-6 p-0" onClick={() => onChange(value + 1)}>
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}
