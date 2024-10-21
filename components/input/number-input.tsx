import React, { ChangeEvent } from "react";
import { isNumber } from "util";

type Props = {
  label?: string;
  type?: string;
  defaultValue?: number;
  value?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  counter?: boolean;
  maxValue?: number;
  onChange: (e: number) => void;
};

function NumberInput({
  label,
  type,
  placeholder,
  className,
  disabled,
  onChange,
  value,
  defaultValue,
}: Props) {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*$/;

    if (value === "" || !regex.test(value)) {
      onChange(0);
      return;
    }

    onChange(Number(value));
  };

  return (
    <div
      className={`
        w-full p-2 text-xs rounded-md border-[1px] border-[#eeeeee] my-2
        ${className ? className : ""}
        ${disabled ? "bg-disabled text-disabledtext" : "bg-white"}
      `}
    >
      <p>{label}</p>
      <div className="flex flex-row">
        <input
          className="outline-none w-full"
          onChange={onValueChange}
          disabled={disabled}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default NumberInput;
