import PrimaryButton from "@/components/button/primary-button";
import Input from "@/components/input";
import NumberInput from "@/components/input/number-input";
import { ProductSale } from "@/interfaces/sale";
import React, { Dispatch, memo, SetStateAction } from "react";

export const defaultProductSale: ProductSale = {
  name: "",
  sellPrice: 0,
  quantity: 0,
};

type Props = {
  productSale: ProductSale;
  setProductSale: Dispatch<SetStateAction<ProductSale>>;
  setCart: Dispatch<SetStateAction<ProductSale[]>>;
};

function AddToCart({ productSale, setProductSale, setCart }: Props) {
  function onProductSaleChange(value: string | number, key: keyof ProductSale) {
    setProductSale((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function onAddToCart() {
    if (!productSale.productId) return alert("Selecet Product First");
    setCart((prev) => {
      return [...prev, productSale];
    });
    setProductSale(defaultProductSale);
  }
  return (
    <>
      <h1 className="text-2xl">Produk</h1>
      <Input
        type="text"
        label="name"
        value={productSale.name}
        onChange={(e) => {}}
      />
      <NumberInput
        type="text"
        label="sell price"
        value={productSale.sellPrice}
        onChange={(e) => onProductSaleChange(e, "sellPrice")}
      />
      <NumberInput
        type="text"
        label="quantity"
        value={productSale.quantity}
        onChange={(e) => onProductSaleChange(e, "quantity")}
      />

      <PrimaryButton onClick={onAddToCart} title="Add to cart" />
    </>
  );
}

export default memo(AddToCart);
