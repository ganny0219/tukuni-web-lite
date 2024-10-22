/*
  Warnings:

  - You are about to drop the column `price` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `buyPrice` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "price",
ADD COLUMN     "buyPrice" INTEGER NOT NULL,
ADD COLUMN     "sellPrice" INTEGER NOT NULL;
