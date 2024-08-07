/*
  Warnings:

  - Added the required column `branch_id` to the `user_attendments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_attendments" ADD COLUMN     "branch_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_attendments" ADD CONSTRAINT "user_attendments_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
