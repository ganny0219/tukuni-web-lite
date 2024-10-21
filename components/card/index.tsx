import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function Card({ children, className, onClick }: Props) {
  return (
    <div
      className={`${className ? className : ""} rounded-md bg-white m-2 `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
