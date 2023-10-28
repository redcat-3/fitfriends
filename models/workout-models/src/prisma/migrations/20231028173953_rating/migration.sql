/*
  Warnings:

  - Added the required column `rating` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
