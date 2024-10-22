import UploadImageInput from "@/components/input/upload-image-input";
import React, { memo, useState } from "react";
import { Product } from "@/interfaces/product";
import Input from "@/components/input";
import NumberInput from "@/components/input/number-input";
import { UseUploadImage } from "@/hooks/upload-image";
import PrimaryButton from "@/components/button/primary-button";
import FileInput from "@/components/input/file-input";
import { apiAxios } from "@/utils/axios";
import { KeyedMutator } from "swr";

const defaultProduct = {
  name: "",
  buyPrice: 0,
  sellPrice: 0,
  stock: 0,
  image: "",
};

type Props = { mutate: KeyedMutator<Product[]> };

function AddProduct({ mutate }: Props) {
  const [newProduct, setNewProduct] = useState<Product>(defaultProduct);
  const { uploading, uploadingFinish, startUploading } = UseUploadImage();
  const newProductChange = (value: string | number, key: keyof Product) => {
    setNewProduct((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const submitNewProduct = async () => {
    for (const productKey in newProduct) {
      if (!newProduct[productKey]) return alert("FILL ALL DATA");
    }
    await apiAxios.post("/product", newProduct);
    mutate();
    setNewProduct(defaultProduct);
  };

  const onExport = async () => {
    if (!exportFile) return;
    const formData = new FormData();
    formData.append("exportFile", exportFile);
    await apiAxios.post("product/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onUploadImage = async (imageFile: File | null) => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    startUploading();
    const result = await apiAxios
      .post<{ path: string }>(`product/upload-image`, formData)
      .finally(() => uploadingFinish());
    const imageUrl = result.data.path;

    setNewProduct((prev) => {
      return {
        ...prev,
        image: imageUrl,
      };
    });
  };

  const [exportFile, setExportFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col w-[30%] ml-4">
      <h1 className="text-2xl ml-2">Add Product</h1>
      <Input
        type="text"
        label="name"
        value={newProduct.name}
        onChange={(e) => newProductChange(e, "name")}
      />
      <NumberInput
        type="text"
        label="buy price"
        value={newProduct.buyPrice}
        onChange={(e) => newProductChange(e, "buyPrice")}
      />
      <NumberInput
        type="text"
        label="sell price"
        value={newProduct.sellPrice}
        onChange={(e) => newProductChange(e, "sellPrice")}
      />
      <NumberInput
        type="text"
        label="stock"
        value={newProduct.stock}
        onChange={(e) => newProductChange(e, "stock")}
      />
      <UploadImageInput
        defaultSrc={newProduct.image}
        onChange={onUploadImage}
        title="image"
        uploading={uploading}
      />

      <PrimaryButton onClick={submitNewProduct} title="Add Product" />
      <div>
        <FileInput onChange={(e) => setExportFile(e)} title="Excel" />
        <PrimaryButton title="Export" onClick={onExport} />
      </div>
    </div>
  );
}

export default memo(AddProduct);
