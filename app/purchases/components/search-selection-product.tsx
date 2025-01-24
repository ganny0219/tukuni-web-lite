import Input from "@/components/input";
import { apiSWR } from "@/hooks/swr";
import { Product } from "@/interfaces/product";
import React, { useState } from "react";

type Props = {
  selectProductPuchase: (product: Product) => void;
};

function SearchSelectionProduct({ selectProductPuchase }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: products } = apiSWR<Product[]>(`/product`, {
    name: search,
  });

  if (!products) return;

  const onFocus = () => {
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };
  const onBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-[200px]">
      <Input
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={setSearch}
        className="outline-none w-full"
      />
      {open && (
        <div className="relative ">
          <div className="absolute w-full max-h-[30vh] top-0 left-0 overflow-y-scroll bg-white">
            {filteredProducts?.map((product, index) => {
              return (
                <p
                  key={index}
                  className="hover:bg-red-50 hover:cursor-pointer p-2"
                  onClick={() => selectProductPuchase(product)}
                >
                  {product.name}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSelectionProduct;
