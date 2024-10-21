"use client";
import React, { ReactNode } from "react";

type Props = {
  data: any[];
  children: ReactNode;
};

function Table({ data, children }: Props) {
  return (
    <>
      {data.length == 0 ? (
        <div className="flex w-full justify-center items-center text-2xl border-t-2 py-6">
          <p>No Data</p>
        </div>
      ) : (
        <table className="border-collapse">{children}</table>
      )}
    </>
  );
}

export default Table;
