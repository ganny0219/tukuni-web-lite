import Card from "@/components/card";
import CustomImage from "@/components/custom-image";
import { Product } from "@/interfaces/product";
import React from "react";

type Props = {
  product: Product;
  onClick: (product: Product) => void;
};

function CashierCard({ product, onClick }: Props) {
  return (
    <Card
      className="flex flex-col p-0 hover:cursor-pointer"
      onClick={() => onClick(product)}
    >
      <CustomImage
        lazyload
        src={product.image}
        alt={product.name}
        className="w-full aspect-square p-0"
      />
      <div className="p-2 text-sm">
        <p>{product.name}</p>
        <div className="flex flex-row justify-between">
          <p>{product.stock}</p>
          <p>Rp. {product.sellPrice}</p>
        </div>
      </div>
    </Card>
  );
}

export default CashierCard;
