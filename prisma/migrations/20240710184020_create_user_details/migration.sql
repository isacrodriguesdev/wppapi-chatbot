-- CreateTable
CREATE TABLE "user_details" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_id_key" ON "user_details"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_cpf_key" ON "user_details"("cpf");

-- CreateIndex
CREATE INDEX "user_details_user_id_idx" ON "user_details"("user_id");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
