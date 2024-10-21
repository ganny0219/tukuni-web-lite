import PrimaryButton from "@/components/button/primary-button";
import React, { Dispatch, memo, SetStateAction } from "react";
import { apiAxios } from "@/utils/axios";
import { ProductSale } from "@/interfaces/sale";

type Props = {
  cart: ProductSale[];
  setCart: Dispatch<SetStateAction<ProductSale[]>>;
};

function Cart({ cart, setCart }: Props) {
  const total = cart.reduce((acc, product) => {
    return acc + product.sellPrice * product.quantity;
  }, 0);

  async function onPay() {
    if (cart.length == 0) return alert("Nothing Product on cart");
    await apiAxios.post("/sales", cart);
    setCart([]);
  }

  return (
    <>
      <p className="text-2xl mt-2">CART</p>
      <ul>
        {cart.map((selectedProduct, index) => {
          return (
            <li key={index} className="flex flex-col my-2">
              <p>{selectedProduct.name}</p>
              <div className="flex flex-row justify-between">
                <p>Rp.{selectedProduct.sellPrice}</p>
                <p>x {selectedProduct.quantity}</p>
                <p>Rp.{selectedProduct.quantity * selectedProduct.sellPrice}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-row justify-between border-t-[1px] border-black py-2">
        <p>Total</p>
        <p>Rp.{total}</p>
      </div>
      <PrimaryButton title="PAY" onClick={onPay} />
    </>
  );
}

export default memo(Cart);
