import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { ProductSale } from "@/interfaces/sale";

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

    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read sales" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ProductSales: ProductSale[] = await req.json();

    await Promise.all(
      ProductSales.map(async (productSale) => {
        const id = productSale.productId;
        await prisma.product.update({
          where: { id },
          data: {
            stock: {
              decrement: productSale.quantity,
            },
          },
        });
      })
    );

    const saleInvoice = await prisma.saleInvoice.create({ data: {} });

    const newSales = await prisma.sale.createMany({
      data: ProductSales.map((productSale) => {
        return {
          saleInvoiceId: saleInvoice.id,
          productId: productSale.productId ? +productSale.productId : 0,
          sellPrice: productSale.sellPrice,
          buyPrice: productSale.buyPrice,
          quantity: productSale.quantity,
        };
      }),
    });

    return NextResponse.json(newSales, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add sales" }, { status: 500 });
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

    const sales = await prisma.sale.findFirst({
      where: {
        id: +id,
      },
    });

    await prisma.product.update({
      where: { id: sales?.productId },
      data: {
        stock: {
          increment: sales?.quantity,
        },
      },
    });

    await prisma.sale.delete({ where: { id: +id } });

    return NextResponse.json(
      { message: "Sales deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete sales" },
      { status: 500 }
    );
  }
}
