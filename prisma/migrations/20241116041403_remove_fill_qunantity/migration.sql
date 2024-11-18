/*
  Warnings:

  - You are about to drop the column `fill_quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fill_quantity",
DROP COLUMN "total";
