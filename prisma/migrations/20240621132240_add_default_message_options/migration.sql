-- AlterTable
ALTER TABLE "default_messages" ADD COLUMN     "group" TEXT;

-- CreateTable
CREATE TABLE "default_message_options" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "message_id" TEXT NOT NULL,
    "child" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "default_message_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "default_message_options_id_key" ON "default_message_options"("id");

-- AddForeignKey
ALTER TABLE "default_message_options" ADD CONSTRAINT "default_message_options_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "default_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
