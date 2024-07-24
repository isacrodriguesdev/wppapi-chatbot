/*
  Warnings:

  - You are about to drop the column `address` on the `user_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_details" DROP COLUMN "address",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "street" TEXT;
