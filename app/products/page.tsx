"use client";
import Table from "@/components/table";
import TableBody from "@/components/table/table-body";
import TableHead from "@/components/table/table-head";
import { apiSWR } from "@/hooks/swr";
import { Product } from "@/interfaces/product";
import { apiAxios } from "@/utils/axios";
import React, { useState } from "react";
import ProductTableData from "./components/product-table-data";
import PrimaryButton from "@/components/button/primary-button";
import Input from "@/components/input";
import NumberInput from "@/components/input/number-input";
import FileInput from "@/components/input/file-input";
import UploadImageInput from "@/components/input/upload-image-input";
import { UseUploadImage } from "@/hooks/upload-image";
import AddProduct from "./components/add-product";

const headerTitles = ["", "Name", "Buy Price", "Sell Price", "Stock", "Action"];

const defaultProduct = {
  name: "",
  buyPrice: 0,
  sellPrice: 0,
  stock: 0,
  image: "",
};

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, mutate } = apiSWR<Product[]>(`/product`, {
    name: searchTerm,
  });
  if (!products) return;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Table data={filteredProducts}>
          <TableHead titles={headerTitles} />
          <TableBody>
            {filteredProducts?.map((product, index) => {
              return (
                <ProductTableData
                  key={index}
                  product={product}
                  mutate={mutate}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <AddProduct mutate={mutate} />
    </div>
  );
}

export default ProductsPage;
