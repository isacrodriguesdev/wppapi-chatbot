/*
  Warnings:

  - Added the required column `group_id` to the `branch_user_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branch_user_requests" ADD COLUMN     "group_id" BYTEA NOT NULL;

-- AddForeignKey
ALTER TABLE "branch_user_requests" ADD CONSTRAINT "branch_user_requests_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "message_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
