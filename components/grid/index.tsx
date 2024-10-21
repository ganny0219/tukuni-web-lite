import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};
function Grid({ className, children }: Props) {
  return <div className={`grid grid-cols-5 ${className}`}>{children}</div>;
}

export default Grid;
