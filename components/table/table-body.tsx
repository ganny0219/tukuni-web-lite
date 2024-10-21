import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function TableBody({ children }: Props) {
  return <tbody>{children}</tbody>;
}
export default TableBody;
