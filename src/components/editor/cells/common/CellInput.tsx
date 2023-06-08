import { Input } from "@/components/ui/input";
import React, { ChangeEvent } from "react";

interface CellInputInterface {
  value: string;
  onChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string | React.ReactNode;
}

const CellInput: React.FC<CellInputInterface> = (props) => {
  const { value, onChangeFn, label } = props;

  return (
    <div className="rounded-lg flex overflow-hidden border border-secondary/5">
      <p className="text-xs px-3 bg-foreground flex items-center justify-center py-2 border-r border-secondary/5">
        {label}
      </p>
      <Input
        value={value}
        onChange={onChangeFn}
        className="w-[70px] rounded-none bg-dark border-none h-[35px] text-xs"
        type="number"
      />
    </div>
  );
};

export default CellInput;
