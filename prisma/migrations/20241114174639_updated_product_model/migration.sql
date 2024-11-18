/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `actual_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fill_quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "price",
ADD COLUMN     "actual_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discount_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fill_quantity" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
