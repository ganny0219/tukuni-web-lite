"use client";
import Input from "@/components/input";
import CashierCard from "./components/cashier-card";
import Grid from "@/components/grid";
import AddToCart, { defaultProductSale } from "./components/add-cart";
import Cart from "./components/cart";
import { apiSWR } from "@/hooks/swr";
import { useState } from "react";
import { Product } from "@/interfaces/product";
import { ProductSale } from "@/interfaces/sale";

export default function CashierPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, mutate } = apiSWR<Product[]>(`/product`, {
    name: searchTerm,
  });

  const [cart, setCart] = useState<ProductSale[]>([]);
  const [productSale, setProductSale] =
    useState<ProductSale>(defaultProductSale);

  if (!products) return;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function addSelectProduct(product: Product) {
    const { name, sellPrice, id, buyPrice } = product;
    setProductSale({
      productId: id,
      productName: name,
      sellPrice,
      buyPrice,
      quantity: 1,
    });
  }

  return (
    <div className="w-full flex flex-row">
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl w-full">Product List</h1>
          <div className="w-full max-w-[200px]">
            <Input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
        </div>
        <div className="max-h-[200vh] overflow-y-scroll">
          <Grid>
            {filteredProducts?.map((product, index) => {
              return (
                <CashierCard
                  key={index}
                  product={product}
                  onClick={addSelectProduct}
                />
              );
            })}
          </Grid>
        </div>
      </div>
      <div className="flex flex-col w-[30%] ml-4">
        <AddToCart
          productSale={productSale}
          setProductSale={setProductSale}
          setCart={setCart}
        />
        <Cart cart={cart} setCart={setCart} mutate={mutate} />
      </div>
    </div>
  );
}
