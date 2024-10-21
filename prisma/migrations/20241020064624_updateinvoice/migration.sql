/*
  Warnings:

  - You are about to drop the column `price` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "price",
DROP COLUMN "quantity";
