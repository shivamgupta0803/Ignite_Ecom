/*
  Warnings:

  - You are about to alter the column `actual_price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `discount_price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `content` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "actual_price" SET DATA TYPE INTEGER,
ALTER COLUMN "discount_price" SET DATA TYPE INTEGER;
