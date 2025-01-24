"use client";
import Table from "@/components/table";
import TableBody from "@/components/table/table-body";
import TableHead from "@/components/table/table-head";
import { apiSWR } from "@/hooks/swr";
import { Product } from "@/interfaces/product";
import React, { useState } from "react";
import PrimaryButton from "@/components/button/primary-button";
import Input from "@/components/input";
import NumberInput from "@/components/input/number-input";
import PurchaseTableData from "./components/purchase-table-data";
import SearchSelectionProduct from "./components/search-selection-product";
import { ProductPurchase } from "@/interfaces/purchase";
import {
  getLastMonth,
  getLastWeek,
  getThisMonth,
  getThisWeek,
  getToday,
  getYesterday,
} from "@/utils/date";
import PurchaseCart from "./components/purchase-cart";
import { Purchase } from "@prisma/client";

const headerTitles = ["Name", "Buy Price", "Quantity", "Image", "Action"];

const defaultProductPurchase: ProductPurchase = {
  productName: "",
  price: 0,
  quantity: 0,
};

function PurchasesPage() {
  const [date, setDate] = useState(getToday());
  const { data: purchase, mutate } = apiSWR<Purchase[]>("/purchase", {
    start: date.start,
    end: date.end,
  });

  const [productPruchase, setProductPuchase] = useState<ProductPurchase>(
    defaultProductPurchase
  );

  const [cart, setCart] = useState<ProductPurchase[]>([]);

  if (!purchase) return;

  const selectProductPuchase = (value: Product) => {
    setProductPuchase((prev) => {
      return {
        ...prev,
        productName: value.name,
        price: value.buyPrice,
        quantity: 1,
        productId: value.id,
      };
    });
  };

  const onProductPuchaseChange = (
    value: string | number,
    key: keyof Purchase
  ) => {
    setProductPuchase((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const addCart = () => {
    if (!productPruchase.productId) return alert("Choose Product First");
    setCart((prev) => {
      return [...prev, productPruchase];
    });
    setProductPuchase(defaultProductPurchase);
  };

  return (
    <div className="w-full flex flex-row">
      <div className="w-full">
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-3xl">Purchase List</h1>
          <div className="flex flex-row ">
            <PrimaryButton title="Today" onClick={() => setDate(getToday())} />
            <PrimaryButton
              title="Yesterday"
              onClick={() => setDate(getYesterday())}
            />
            <PrimaryButton
              title="Last Week"
              onClick={() => setDate(getLastWeek())}
            />
            <PrimaryButton
              title="This Week"
              onClick={() => setDate(getThisWeek())}
            />
            <PrimaryButton
              title="Last Month"
              onClick={() => setDate(getLastMonth())}
            />
            <PrimaryButton
              title="This Month"
              onClick={() => setDate(getThisMonth())}
            />
          </div>
        </div>
        <Table data={purchase}>
          <TableHead titles={headerTitles} />
          <TableBody>
            {purchase?.map((data) => {
              return <PurchaseTableData purchase={data} mutate={mutate} />;
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col w-[30%] ml-4">
        <h1 className="text-2xl ml-2">Add Purchase</h1>
        <SearchSelectionProduct selectProductPuchase={selectProductPuchase} />
        <Input
          type="text"
          label="name"
          value={productPruchase.productName}
          onChange={(e) => {}}
        />
        <NumberInput
          type="text"
          label="buy price"
          value={productPruchase.price}
          onChange={(e) => onProductPuchaseChange(e, "price")}
        />

        <NumberInput
          type="text"
          label="quantity"
          value={productPruchase.quantity}
          onChange={(e) => onProductPuchaseChange(e, "quantity")}
        />

        <PrimaryButton onClick={addCart} title="Add Product" />
        <PurchaseCart cart={cart} setCart={setCart} mutate={mutate} />
      </div>
    </div>
  );
}

export default PurchasesPage;
