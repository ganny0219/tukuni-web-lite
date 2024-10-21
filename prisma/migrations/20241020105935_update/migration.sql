/*
  Warnings:

  - You are about to drop the `ProductSales` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductSales" DROP CONSTRAINT "ProductSales_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSales" DROP CONSTRAINT "ProductSales_salesId_fkey";

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductSales";

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
