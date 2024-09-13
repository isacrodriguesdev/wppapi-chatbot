-- CreateTable
CREATE TABLE "companies" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" BYTEA NOT NULL,
    "company_id" BYTEA NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch_user_requests" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branch_user_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BYTEA NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "birth_date" TIMESTAMP(3),
    "profile_image" TEXT,
    "cpf" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "roles" TEXT[] DEFAULT ARRAY['customer']::TEXT[],
    "branch_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_branches" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "department_id" BYTEA NOT NULL,

    CONSTRAINT "department_branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_employees" (
    "id" BYTEA NOT NULL,
    "department_id" BYTEA NOT NULL,
    "employee_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "department_employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "department_id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_assignments" (
    "id" BYTEA NOT NULL,
    "conversation_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_messages" (
    "id" BYTEA NOT NULL,
    "conversation_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "device_id" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
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

    CONSTRAINT "employee_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch_work_hours" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "weekday" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,

    CONSTRAINT "branch_work_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_groups" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "message_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" BYTEA NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" BYTEA NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "group_id" BYTEA NOT NULL,
    "bundle" TEXT,
    "delay" BIGINT NOT NULL DEFAULT 500,
    "content" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_actions" (
    "id" BYTEA NOT NULL,
    "message_id" BYTEA NOT NULL,
    "action_id" BYTEA NOT NULL,

    CONSTRAINT "message_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_options" (
    "id" BYTEA NOT NULL,
    "message_id" BYTEA NOT NULL,
    "destination_group_id" BYTEA NOT NULL,
    "content" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "message_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_option_actions" (
    "id" BYTEA NOT NULL,
    "option_id" BYTEA NOT NULL,
    "action_id" BYTEA NOT NULL,

    CONSTRAINT "message_option_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_interactions" (
    "id" BYTEA NOT NULL,
    "group_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_programs" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "new_user_bonus" DOUBLE PRECISION NOT NULL,
    "commission_rate" DOUBLE PRECISION NOT NULL,
    "expiration" INTEGER NOT NULL DEFAULT 365,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_program_users" (
    "id" BYTEA NOT NULL,
    "code" TEXT NOT NULL,
    "program_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_program_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" BYTEA NOT NULL,
    "program_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "referred_user_id" BYTEA NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credits" (
    "id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "referral_id" BYTEA NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions_users" (
    "id" BYTEA NOT NULL,
    "transaction_id" BYTEA NOT NULL,
    "user_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions_services" (
    "id" BYTEA NOT NULL,
    "service_id" BYTEA NOT NULL,
    "transaction_id" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" BYTEA NOT NULL,
    "branch_id" BYTEA NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "type" TEXT NOT NULL DEFAULT 'payment',
    "status" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "externalId" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions_payments" (
    "id" BYTEA NOT NULL,
    "transaction_id" BYTEA NOT NULL,
    "method" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_phone_idx" ON "companies"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "branches_id_key" ON "branches"("id");

-- CreateIndex
CREATE INDEX "branches_company_id_phone_idx" ON "branches"("company_id", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "branch_user_requests_id_key" ON "branch_user_requests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_branch_id_phone_idx" ON "users"("branch_id", "phone");

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
CREATE UNIQUE INDEX "conversations_id_key" ON "conversations"("id");

-- CreateIndex
CREATE INDEX "conversations_user_id_department_id_branch_id_status_idx" ON "conversations"("user_id", "department_id", "branch_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_assignments_id_key" ON "conversation_assignments"("id");

-- CreateIndex
CREATE INDEX "conversation_assignments_conversation_id_user_id_idx" ON "conversation_assignments"("conversation_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_messages_id_key" ON "conversation_messages"("id");

-- CreateIndex
CREATE INDEX "conversation_messages_conversation_id_user_id_type_idx" ON "conversation_messages"("conversation_id", "user_id", "type");

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
CREATE UNIQUE INDEX "branch_work_hours_id_key" ON "branch_work_hours"("id");

-- CreateIndex
CREATE INDEX "branch_work_hours_branch_id_weekday_idx" ON "branch_work_hours"("branch_id", "weekday");

-- CreateIndex
CREATE UNIQUE INDEX "services_id_key" ON "services"("id");

-- CreateIndex
CREATE INDEX "services_branch_id_idx" ON "services"("branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_groups_id_key" ON "message_groups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "message_groups_name_key" ON "message_groups"("name");

-- CreateIndex
CREATE INDEX "message_groups_name_idx" ON "message_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "actions_id_key" ON "actions"("id");

-- CreateIndex
CREATE INDEX "actions_name_idx" ON "actions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "messages_id_key" ON "messages"("id");

-- CreateIndex
CREATE INDEX "messages_group_id_sequence_bundle_idx" ON "messages"("group_id", "sequence", "bundle");

-- CreateIndex
CREATE UNIQUE INDEX "message_actions_id_key" ON "message_actions"("id");

-- CreateIndex
CREATE INDEX "message_actions_message_id_action_id_idx" ON "message_actions"("message_id", "action_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_options_id_key" ON "message_options"("id");

-- CreateIndex
CREATE INDEX "message_options_message_id_destination_group_id_index_idx" ON "message_options"("message_id", "destination_group_id", "index");

-- CreateIndex
CREATE UNIQUE INDEX "message_option_actions_id_key" ON "message_option_actions"("id");

-- CreateIndex
CREATE INDEX "message_option_actions_option_id_action_id_idx" ON "message_option_actions"("option_id", "action_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_interactions_id_key" ON "message_interactions"("id");

-- CreateIndex
CREATE INDEX "message_interactions_group_id_user_id_idx" ON "message_interactions"("group_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_programs_id_key" ON "referral_programs"("id");

-- CreateIndex
CREATE INDEX "referral_programs_branch_id_idx" ON "referral_programs"("branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_program_users_id_key" ON "referral_program_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_program_users_code_key" ON "referral_program_users"("code");

-- CreateIndex
CREATE INDEX "referral_program_users_program_id_user_id_code_idx" ON "referral_program_users"("program_id", "user_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_id_key" ON "referrals"("id");

-- CreateIndex
CREATE INDEX "referrals_program_id_referred_user_id_user_id_idx" ON "referrals"("program_id", "referred_user_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "credits_id_key" ON "credits"("id");

-- CreateIndex
CREATE INDEX "credits_user_id_referral_id_type_idx" ON "credits"("user_id", "referral_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_users_id_key" ON "transactions_users"("id");

-- CreateIndex
CREATE INDEX "transactions_users_user_id_transaction_id_idx" ON "transactions_users"("user_id", "transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_services_id_key" ON "transactions_services"("id");

-- CreateIndex
CREATE INDEX "transactions_services_service_id_transaction_id_idx" ON "transactions_services"("service_id", "transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE INDEX "transactions_branch_id_status_type_idx" ON "transactions"("branch_id", "status", "type");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_payments_id_key" ON "transactions_payments"("id");

-- CreateIndex
CREATE INDEX "transactions_payments_transaction_id_idx" ON "transactions_payments"("transaction_id");

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch_user_requests" ADD CONSTRAINT "branch_user_requests_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_branches" ADD CONSTRAINT "department_branches_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_branches" ADD CONSTRAINT "department_branches_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_employees" ADD CONSTRAINT "department_employees_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_employees" ADD CONSTRAINT "department_employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_assignments" ADD CONSTRAINT "conversation_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_assignments" ADD CONSTRAINT "conversation_assignments_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "branch_work_hours" ADD CONSTRAINT "branch_work_hours_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "message_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_actions" ADD CONSTRAINT "message_actions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_actions" ADD CONSTRAINT "message_actions_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_options" ADD CONSTRAINT "message_options_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_options" ADD CONSTRAINT "message_options_destination_group_id_fkey" FOREIGN KEY ("destination_group_id") REFERENCES "message_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_option_actions" ADD CONSTRAINT "message_option_actions_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "message_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_option_actions" ADD CONSTRAINT "message_option_actions_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_interactions" ADD CONSTRAINT "message_interactions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "message_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_interactions" ADD CONSTRAINT "message_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_programs" ADD CONSTRAINT "referral_programs_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_program_users" ADD CONSTRAINT "referral_program_users_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "referral_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_program_users" ADD CONSTRAINT "referral_program_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "referral_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_user_id_fkey" FOREIGN KEY ("referred_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_referral_id_fkey" FOREIGN KEY ("referral_id") REFERENCES "referrals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_users" ADD CONSTRAINT "transactions_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_users" ADD CONSTRAINT "transactions_users_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_services" ADD CONSTRAINT "transactions_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_services" ADD CONSTRAINT "transactions_services_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_payments" ADD CONSTRAINT "transactions_payments_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
