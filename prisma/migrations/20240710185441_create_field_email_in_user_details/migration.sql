/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user_details` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "user_details" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "user_details_email_key" ON "user_details"("email");
