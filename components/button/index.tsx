"use client";
import React from "react";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

function Button({ title, onClick, className, type }: Props) {
  return (
    <button
      type={type}
      className={`bg-white p-2 rounded-md hover:opacity-80 ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
