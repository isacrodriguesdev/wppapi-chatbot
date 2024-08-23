import { Module } from "@nestjs/common";
import { FetchAnalyticalData } from "src/app/usecases/fetch-analytical-data/fetch-analytical-data";
import { FetchLatestSchedule } from "src/app/usecases/fetch-latest-schedule/fetch-latest-schedule";
import { GetScheduleById } from "src/app/usecases/get-schedule-by-id/get-schedule-by-id";
import { GetLatestSchedule } from "src/app/usecases/get-latest-schedule/get-latest-schedule";
import { LoginAccount } from "src/app/usecases/login-account/login-account";
import { UpdateSchedule } from "src/app/usecases/update-schedule/update-schedule";
import { UpdateEmployee } from "src/app/usecases/update-employee/update-employee";
import { AccountController } from "src/controllers/account.controller";
import { AppController } from "src/controllers/app.controller";
import { AuthModule } from "src/shared/infra/auth/auth.module";
import { DatabaseModule } from "src/shared/infra/database/database.module";
import { EncryptionModule } from "src/shared/infra/encryption/encryption.module";
import { ServiceModule } from "src/shared/services/service.module";
import { ScheduleController } from "src/controllers/schedule.controller";
import { CreateTicketMessage } from "src/app/usecases/create-ticket-message/create-ticket-message";
import { NewMessageHandler } from "src/app/hadlers/new-message/new-message-handler";
import { FetchTicket } from "src/app/usecases/fetch-ticket/fetch-ticket";

@Module({
  imports: [DatabaseModule, AuthModule, EncryptionModule, ServiceModule],
  controllers: [AppController, ScheduleController, AccountController],
  providers: [
    LoginAccount,
    FetchLatestSchedule,
    UpdateSchedule,
    FetchAnalyticalData,
    GetScheduleById,
    GetLatestSchedule,
    UpdateEmployee,
    FetchTicket,
  ],
  exports: [],
})
export class AppModule {}
