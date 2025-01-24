import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { Product } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const searchName = req.nextUrl.searchParams.get("name");
    console.log(searchName);
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: searchName ? searchName : "",
          mode: "insensitive",
        },
      },
      take: 30,
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const product: Product = await req.json();
    const newProduct = await prisma.product.create({ data: product });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product Id not Found" },
        { status: 403 }
      );
    }

    await prisma.product.delete({ where: { id: +id } });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const product = await req.json();

    if (!product.id) {
      return NextResponse.json(
        { message: "Product Id not Found" },
        { status: 403 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
