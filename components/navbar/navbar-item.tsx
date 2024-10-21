import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  pathName: string;
  path: string;
};
function NavbarItem({ title, pathName, path }: Props) {
  return (
    <li
      className={`mx-2 ${
        "/" + path == pathName ? "bg-red-200 rounded-md py-[2px] px-2" : ""
      }`}
    >
      <Link href={{ pathname: pathName }}>{title}</Link>
    </li>
  );
}

export default NavbarItem;
