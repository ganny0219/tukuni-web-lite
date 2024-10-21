import React, { ChangeEvent } from "react";

type Props = {
  label?: string;
  type?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  counter?: boolean;
  maxValue?: number;
  onChange: (e: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

function Input({
  label,
  type,
  placeholder,
  className,
  disabled,
  onChange,
  value,
  defaultValue,
  counter,
  maxValue,
  onFocus,
  onBlur,
}: Props) {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let validate = true;
    if (maxValue) {
      validate = value && value.length >= maxValue ? false : true;
    }
    if (validate) {
      onChange(e.target.value);
    }
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {counter && (
          <p>
            {value?.length}/{maxValue ?? "10"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
