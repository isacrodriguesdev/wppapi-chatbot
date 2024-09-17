/*
  Warnings:

  - You are about to drop the column `bundle` on the `messages` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "messages_group_id_sequence_bundle_idx";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "bundle";

-- CreateTable
CREATE TABLE "employee_services" (
    "id" BYTEA NOT NULL,
    "employee_id" BYTEA NOT NULL,
    "service_id" BYTEA NOT NULL,

    CONSTRAINT "employee_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_services_id_key" ON "employee_services"("id");

-- CreateIndex
CREATE INDEX "employee_services_employee_id_service_id_idx" ON "employee_services"("employee_id", "service_id");

-- CreateIndex
CREATE INDEX "messages_group_id_sequence_idx" ON "messages"("group_id", "sequence");

-- AddForeignKey
ALTER TABLE "employee_services" ADD CONSTRAINT "employee_services_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_services" ADD CONSTRAINT "employee_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
