-- CreateTable
CREATE TABLE "companies" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "questions" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BYTEA NOT NULL,
    "name" TEXT,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "companyId" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_branches" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "department_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_employees" (
    "id" BYTEA NOT NULL,
    "department_id" BYTEA NOT NULL,
    "employee_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "department_id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_assignments" (
    "id" BYTEA NOT NULL,
    "ticket_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_messages" (
    "id" BYTEA NOT NULL,
    "ticket_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "birth_date" TIMESTAMP(3),
    "zip_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "password" TEXT,
    "device_id" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "roles" TEXT[] DEFAULT ARRAY['employee']::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "service_id" BYTEA NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schedules" (
    "id" BYTEA NOT NULL,
    "schedule_id" BYTEA NOT NULL,
    "employee_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch_operating_days" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "week_day" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branch_operating_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" BYTEA NOT NULL,
    "company_id" BYTEA NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zip_code" TEXT,
    "complement" TEXT,
    "state" TEXT,
    "city" TEXT,
    "geo_location" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predefined_messages" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "actions" TEXT[],
    "group" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "predefined_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predefined_message_options" (
    "id" BYTEA NOT NULL,
    "message_id" BYTEA NOT NULL,
    "index" INTEGER NOT NULL,
    "child" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "predefined_message_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_messages" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "group" TEXT,
    "actions" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_message_options" (
    "id" BYTEA NOT NULL,
    "index" INTEGER NOT NULL,
    "message_id" BYTEA NOT NULL,
    "child" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_message_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_programs" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Standard',
    "company_id" BYTEA NOT NULL,
    "bonus" DOUBLE PRECISION NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_codes" (
    "id" BYTEA NOT NULL,
    "code" TEXT NOT NULL,
    "program_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" BYTEA NOT NULL,
    "program_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "referred_user_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_usages" (
    "id" BYTEA NOT NULL,
    "referral_id" BYTEA NOT NULL,
    "payment_id" BYTEA NOT NULL,
    "used_amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credits" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" BYTEA NOT NULL,
    "external_id" TEXT NOT NULL,
    "user_id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_services" (
    "id" BYTEA NOT NULL,
    "service_id" BYTEA NOT NULL,
    "payment_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transations" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_phone_idx" ON "companies"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE INDEX "users_companyId_phone_idx" ON "users"("companyId", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "departments_id_key" ON "departments"("id");

-- CreateIndex
CREATE INDEX "departments_name_idx" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "department_branches_id_key" ON "department_branches"("id");

-- CreateIndex
CREATE INDEX "department_branches_branch_id_department_id_idx" ON "department_branches"("branch_id", "department_id");

-- CreateIndex
CREATE UNIQUE INDEX "department_employees_id_key" ON "department_employees"("id");

-- CreateIndex
CREATE INDEX "department_employees_department_id_employee_id_idx" ON "department_employees"("department_id", "employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_id_key" ON "tickets"("id");

-- CreateIndex
CREATE INDEX "tickets_user_id_department_id_status_idx" ON "tickets"("user_id", "department_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_assignments_id_key" ON "ticket_assignments"("id");

-- CreateIndex
CREATE INDEX "ticket_assignments_ticket_id_user_id_idx" ON "ticket_assignments"("ticket_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_messages_id_key" ON "ticket_messages"("id");

-- CreateIndex
CREATE INDEX "ticket_messages_ticket_id_idx" ON "ticket_messages"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_id_key" ON "user_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_cpf_key" ON "user_profiles"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_birth_date_key" ON "user_profiles"("birth_date");

-- CreateIndex
CREATE INDEX "user_profiles_user_id_email_cpf_idx" ON "user_profiles"("user_id", "email", "cpf");

-- CreateIndex
CREATE UNIQUE INDEX "employees_id_key" ON "employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE INDEX "employees_user_id_email_phone_idx" ON "employees"("user_id", "email", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_id_key" ON "schedules"("id");

-- CreateIndex
CREATE INDEX "schedules_user_id_branch_id_service_id_date_idx" ON "schedules"("user_id", "branch_id", "service_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "employee_schedules_id_key" ON "employee_schedules"("id");

-- CreateIndex
CREATE INDEX "employee_schedules_employee_id_schedule_id_idx" ON "employee_schedules"("employee_id", "schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "branch_operating_days_id_key" ON "branch_operating_days"("id");

-- CreateIndex
CREATE INDEX "branch_operating_days_branch_id_week_day_idx" ON "branch_operating_days"("branch_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "services_id_key" ON "services"("id");

-- CreateIndex
CREATE INDEX "services_branch_id_idx" ON "services"("branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "branches_id_key" ON "branches"("id");

-- CreateIndex
CREATE INDEX "branches_company_id_phone_idx" ON "branches"("company_id", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "predefined_messages_id_key" ON "predefined_messages"("id");

-- CreateIndex
CREATE INDEX "predefined_messages_name_idx" ON "predefined_messages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "predefined_message_options_id_key" ON "predefined_message_options"("id");

-- CreateIndex
CREATE INDEX "predefined_message_options_message_id_idx" ON "predefined_message_options"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_messages_id_key" ON "custom_messages"("id");

-- CreateIndex
CREATE INDEX "custom_messages_branch_id_name_idx" ON "custom_messages"("branch_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "custom_message_options_id_key" ON "custom_message_options"("id");

-- CreateIndex
CREATE INDEX "custom_message_options_message_id_idx" ON "custom_message_options"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_programs_id_key" ON "referral_programs"("id");

-- CreateIndex
CREATE INDEX "referral_programs_company_id_idx" ON "referral_programs"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_id_key" ON "referral_codes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_code_key" ON "referral_codes"("code");

-- CreateIndex
CREATE INDEX "referral_codes_program_id_user_id_idx" ON "referral_codes"("program_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_id_key" ON "referrals"("id");

-- CreateIndex
CREATE INDEX "referrals_program_id_referred_user_id_user_id_idx" ON "referrals"("program_id", "referred_user_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_usages_id_key" ON "referral_usages"("id");

-- CreateIndex
CREATE INDEX "referral_usages_referral_id_payment_id_idx" ON "referral_usages"("referral_id", "payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "credits_id_key" ON "credits"("id");

-- CreateIndex
CREATE INDEX "credits_user_id_source_idx" ON "credits"("user_id", "source");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_external_id_key" ON "payments"("external_id");

-- CreateIndex
CREATE INDEX "payments_user_id_branch_id_external_id_idx" ON "payments"("user_id", "branch_id", "external_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_services_id_key" ON "payment_services"("id");

-- CreateIndex
CREATE INDEX "payment_services_service_id_idx" ON "payment_services"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "transations_id_key" ON "transations"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_branches" ADD CONSTRAINT "department_branches_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_branches" ADD CONSTRAINT "department_branches_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_employees" ADD CONSTRAINT "department_employees_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_employees" ADD CONSTRAINT "department_employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_assignments" ADD CONSTRAINT "ticket_assignments_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedules" ADD CONSTRAINT "employee_schedules_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedules" ADD CONSTRAINT "employee_schedules_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch_operating_days" ADD CONSTRAINT "branch_operating_days_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predefined_message_options" ADD CONSTRAINT "predefined_message_options_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "predefined_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_messages" ADD CONSTRAINT "custom_messages_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_message_options" ADD CONSTRAINT "custom_message_options_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "custom_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_programs" ADD CONSTRAINT "referral_programs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "referral_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_user_id_fkey" FOREIGN KEY ("referred_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_usages" ADD CONSTRAINT "referral_usages_referral_id_fkey" FOREIGN KEY ("referral_id") REFERENCES "referrals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_usages" ADD CONSTRAINT "referral_usages_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_services" ADD CONSTRAINT "payment_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_services" ADD CONSTRAINT "payment_services_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transations" ADD CONSTRAINT "transations_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
