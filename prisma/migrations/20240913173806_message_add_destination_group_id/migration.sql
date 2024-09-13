-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "destination_group_id" BYTEA;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_destination_group_id_fkey" FOREIGN KEY ("destination_group_id") REFERENCES "message_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
