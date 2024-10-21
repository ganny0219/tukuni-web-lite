"use client";
import React from "react";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

function CancelButton({ title, onClick, className, type }: Props) {
  return (
    <button
      type={type}
      className={`bg-red-400 hover:bg-red-600 text-white border-none p-2 rounded-md ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default CancelButton;
