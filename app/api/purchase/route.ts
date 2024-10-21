import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { ProductPurchase } from "@/interfaces/purchase";

export async function GET(req: NextRequest) {
  try {
    const startDate = req.nextUrl.searchParams.get("start");
    const endDate = req.nextUrl.searchParams.get("end");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { message: "start date end date required!" },
        { status: 400 }
      );
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read purchases" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const productPurcases: ProductPurchase[] = await req.json();

    await Promise.all(
      productPurcases.map(async (productPurcase) => {
        const id = productPurcase.productId;
        await prisma.product.update({
          where: { id },
          data: {
            stock: {
              increment: productPurcase.quantity,
            },
          },
        });
      })
    );

    const purchaseInvoice = await prisma.purchaseInvoice.create({ data: {} });

    const newSales = await prisma.purchase.createMany({
      data: productPurcases.map((productPurcase) => {
        return {
          purchaseInvoiceId: purchaseInvoice.id,
          productId: productPurcase.productId ? +productPurcase.productId : 0,
          price: productPurcase.price,
          quantity: productPurcase.quantity,
        };
      }),
    });

    return NextResponse.json(newSales, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add purchases" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Sales Id not Found" },
        { status: 403 }
      );
    }

    const purchases = await prisma.purchase.findFirst({
      where: {
        id: +id,
      },
    });

    await prisma.product.update({
      where: { id: purchases?.productId },
      data: {
        stock: {
          decrement: purchases?.quantity,
        },
      },
    });

    await prisma.purchase.delete({ where: { id: +id } });

    return NextResponse.json(
      { message: "Sales deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete purchases" },
      { status: 500 }
    );
  }
}
