import React from "react";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

function SecondaryButton({ title, onClick, className, type }: Props) {
  return (
    <button
      type={type}
      className={`bg-white text-red-300 border-red-300 border-[1px] rounded-md ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default SecondaryButton;
