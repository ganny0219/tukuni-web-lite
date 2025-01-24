-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "productName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "productName" TEXT NOT NULL DEFAULT '';
