import React from "react";
import CancelButton from "@/components/button/cancel-button";
import { apiAxios } from "@/utils/axios";
import { KeyedMutator } from "swr";
import { Sale } from "@prisma/client";

type Props = {
  sales: Sale;
  mutate: KeyedMutator<Sale[]>;
};

function SalesTableData({ sales, mutate }: Props) {
  const handleDeleteProduct = async () => {
    await apiAxios.delete(`/sales?id=${sales.id}`);
    mutate();
  };

  return (
    <tr>
      <td>{sales.id}</td>
      <td>Rp.{sales.price}</td>
      <td>{sales.quantity}</td>
      <td>Rp.{sales.price * sales.quantity}</td>

      <td>
        <CancelButton onClick={handleDeleteProduct} title="Delete" />
      </td>
    </tr>
  );
}

export default SalesTableData;
