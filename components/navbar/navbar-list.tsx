import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function NavbarList({ children }: Props) {
  return <ul className="flex flex-row items-center">{children}</ul>;
}

export default NavbarList;
