/*
  Warnings:

  - You are about to drop the column `orderType` on the `orders` table. All the data in the column will be lost.
  - Added the required column `coach_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_type` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('consider', 'rejected', 'accept');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderType",
ADD COLUMN     "coach_id" TEXT NOT NULL,
ADD COLUMN     "order_type" "OrderType" NOT NULL;

-- CreateTable
CREATE TABLE "requests" (
    "request_id" SERIAL NOT NULL,
    "requester" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "RequestStatus" NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "balances" (
    "balance_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("balance_id")
);
