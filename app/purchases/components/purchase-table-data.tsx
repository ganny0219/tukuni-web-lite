import React from "react";
import CancelButton from "@/components/button/cancel-button";
import { Purchase } from "@prisma/client";
import { apiAxios } from "@/utils/axios";
import { KeyedMutator } from "swr";

type Props = {
  purchase: Purchase;
  mutate: KeyedMutator<Purchase[]>;
};

function PurchaseTableData({ purchase, mutate }: Props) {
  const handleDeleteProduct = async () => {
    await apiAxios.delete(`/purchase?id=${purchase.id}`);
    mutate();
  };

  return (
    <tr>
      <td>{purchase.id}</td>
      <td>Rp.{purchase.price}</td>
      <td>{purchase.quantity}</td>
      <td>Rp.{purchase.price * purchase.quantity}</td>

      <td>
        <CancelButton onClick={handleDeleteProduct} title="Delete" />
      </td>
    </tr>
  );
}

export default PurchaseTableData;
