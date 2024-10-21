import React from "react";
import NavbarList from "./navbar-list";
import NavbarItem from "./navbar-item";

type Props = {
  path: string;
};
function Navbar({ path }: Props) {
  return (
    <nav className="h-[10vh] bg-red-100 w-full flex justify-center items-center">
      <div className=" w-full max-w-[1100px] flex flex-row justify-between items-center">
        <h1 className="text-3xl">TUKUNI</h1>
        <NavbarList>
          <NavbarItem title="Cashier" pathName="/cashier" path={path} />
          <NavbarItem title="Products" pathName="/products" path={path} />
          <NavbarItem title="Sale" pathName="/sales" path={path} />
          <NavbarItem title="Purchases" pathName="/purchases" path={path} />
        </NavbarList>
      </div>
    </nav>
  );
}

export default Navbar;
