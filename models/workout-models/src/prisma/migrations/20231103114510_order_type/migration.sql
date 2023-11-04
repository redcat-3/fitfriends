/*
  Warnings:

  - Changed the type of `orderType` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('subscription');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderType",
ADD COLUMN     "orderType" "OrderType" NOT NULL;
