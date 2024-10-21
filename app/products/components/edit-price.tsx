import NumberInput from "@/components/input/number-input";
import { Product } from "@/interfaces/product";
import { apiAxios } from "@/utils/axios";
import React, { useState } from "react";
import { KeyedMutator } from "swr";

type Props = {
  productId?: number;
  price: number;
  field: "sellPrice" | "buyPrice";
  mutate: KeyedMutator<Product[]>;
};

function EditPrice({ productId, price, field, mutate }: Props) {
  const [edit, setEdit] = useState(false);
  const [editedPrice, setEditedPrice] = useState(price);
  const onUpdate = async () => {
    if (!productId) return;
    await apiAxios.patch("/product", {
      id: productId,
      [field]: editedPrice,
    });
    mutate();
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <div className="flex flex-row items-center">
          <NumberInput
            defaultValue={price}
            onChange={(e) => setEditedPrice(e)}
          />
          <div className="relative flex items-center">
            <div className="absolute flex flex-row">
              <button
                className="bg-green-500 rounded-md w-[30px] h-[30px]"
                onClick={onUpdate}
              >
                V
              </button>
              <button
                className="bg-red-500 rounded-md w-[30px] h-[30px]"
                onClick={() => setEdit(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setEdit(true)}>{price}</button>
      )}
    </>
  );
}

export default EditPrice;
