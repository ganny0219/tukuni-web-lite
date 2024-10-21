"use client";
import React from "react";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

function PrimaryButton({ title, onClick, className, type }: Props) {
  return (
    <button
      type={type}
      className={`bg-red-100 hover:bg-red-200 text-black rounded-md border-none p-2 mx-2 ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default PrimaryButton;
