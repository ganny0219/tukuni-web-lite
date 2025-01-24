import PrimaryButton from "@/components/button/primary-button";
import React, { Dispatch, SetStateAction } from "react";
import { apiAxios } from "@/utils/axios";
import { ProductPurchase } from "@/interfaces/purchase";
import { KeyedMutator } from "swr";
import { Purchase } from "@prisma/client";

type Props = {
  cart: ProductPurchase[];
  setCart: Dispatch<SetStateAction<ProductPurchase[]>>;
  mutate: KeyedMutator<Purchase[]>;
};

function PurchaseCart({ cart, setCart, mutate }: Props) {
  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  async function onSubmit() {
    if (cart.length == 0) return alert("Nothing Product on cart");
    await apiAxios.post("/purchase", cart);
    setCart([]);
    mutate();
  }

  return (
    <>
      <p className="text-2xl mt-2">Purchase Cart</p>
      <ul>
        {cart.map((productPuchase, index) => {
          return (
            <li key={index} className="flex flex-col my-2">
              <p>{productPuchase.productName}</p>
              <div className="flex flex-row justify-between">
                <p>Rp.{productPuchase.price}</p>
                <p>x {productPuchase.quantity}</p>
                <p>Rp.{productPuchase.quantity * productPuchase.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-row justify-between border-t-[1px] border-black py-2">
        <p>Total</p>
        <p>Rp.{total}</p>
      </div>
      <PrimaryButton title="Submit" onClick={onSubmit} />
    </>
  );
}

export default PurchaseCart;
