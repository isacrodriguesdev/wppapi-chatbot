/*
  Warnings:

  - You are about to drop the column `fb_android_device_token` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `fb_ios_device_token` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "fb_android_device_token",
DROP COLUMN "fb_ios_device_token",
ADD COLUMN     "device_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attendments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "employee_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_attendments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attendment_messages" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "attendment_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_attendment_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch_departments" (
    "id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branch_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_departments" (
    "id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_departments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_attendments" ADD CONSTRAINT "user_attendments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attendments" ADD CONSTRAINT "user_attendments_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attendments" ADD CONSTRAINT "user_attendments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attendment_messages" ADD CONSTRAINT "user_attendment_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attendment_messages" ADD CONSTRAINT "user_attendment_messages_attendment_id_fkey" FOREIGN KEY ("attendment_id") REFERENCES "user_attendments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch_departments" ADD CONSTRAINT "branch_departments_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch_departments" ADD CONSTRAINT "branch_departments_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_departments" ADD CONSTRAINT "employee_departments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_departments" ADD CONSTRAINT "employee_departments_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "branch_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
