import React from "react";
import { Product } from "@/interfaces/product";
import CancelButton from "@/components/button/cancel-button";
import { apiAxios } from "@/utils/axios";
import { KeyedMutator } from "swr";
import CustomImage from "@/components/custom-image";
import EditPrice from "./edit-price";

type Props = {
  product: Product;
  mutate: KeyedMutator<Product[]>;
};

function ProductTableData({ product, mutate }: Props) {
  const handleDeleteProduct = async () => {
    await apiAxios.delete(`/product?id=${product.id}`);
    mutate();
  };

  return (
    <tr>
      <td>
        <div className="flex items-center justify-center">
          <CustomImage
            lazyload
            src={product.image}
            alt={product.name}
            size={100}
          />
        </div>
      </td>
      <td>
        <p className="max-w-[200px] line-clamp-3">{product.name}</p>
      </td>
      <td>
        <EditPrice
          productId={product.id}
          price={product.buyPrice}
          field="buyPrice"
          mutate={mutate}
        />
      </td>
      <td>
        <EditPrice
          productId={product.id}
          price={product.sellPrice}
          field="sellPrice"
          mutate={mutate}
        />
      </td>
      <td>{product.stock}</td>
      <td>
        <CancelButton onClick={handleDeleteProduct} title="Delete" />
      </td>
    </tr>
  );
}

export default ProductTableData;
