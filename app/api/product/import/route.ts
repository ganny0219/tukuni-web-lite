import { Product } from "@/interfaces/product";
import { prisma } from "@/prisma/prisma-client";
import { parseXlsx } from "@/utils/excel";
import { NextRequest, NextResponse } from "next/server";

type OlseraProducts = {
  name: string;
  variant_names: string;
  buy_price: string;
  sell_price: string;
  stock_qty: string;
  photo_1: string;
};

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("exportFile") as File;

  const bytes = await file.arrayBuffer();
  const fileBuffer = Buffer.from(bytes);
  const exportJson = await parseXlsx<OlseraProducts>(fileBuffer);
  const products: Product[] = await Promise.all(
    exportJson.map((product) => {
      const { name, variant_names, buy_price, sell_price, stock_qty, photo_1 } =
        product;
      return {
        name: variant_names != undefined ? `${name} ${variant_names}` : name,
        buyPrice: +buy_price,
        sellPrice: +sell_price,
        stock: +stock_qty,
        image: photo_1 != undefined ? photo_1 : "/images/no-picture.png",
      };
    })
  );
  await prisma.product.createMany({ data: products });
  return NextResponse.json(exportJson, { status: 200 });
}
