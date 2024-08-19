import { Module } from "@nestjs/common";
import { FetchAnalyticalData } from "src/app/usecases/fetch-analytical-data/fetch-analytical-data";
import { FetchLatestAppointment } from "src/app/usecases/fetch-latest-appointment/fetch-latest-appointment";
import { GetAppointmentById } from "src/app/usecases/get-appointment-by-id/get-appointment-by-id";
import { GetLatestAppointment } from "src/app/usecases/get-latest-appointment/get-latest-appointment";
import { LoginAccount } from "src/app/usecases/login-account/login-account";
import { UpdateAppointment } from "src/app/usecases/update-appointment/update-appointment";
import { UpdateEmployee } from "src/app/usecases/update-employee/update-employee";
import { AccountController } from "src/controllers/account.controller";
import { AppController } from "src/controllers/app.controller";
import { AuthModule } from "src/shared/infra/auth/auth.module";
import { DatabaseModule } from "src/shared/infra/database/database.module";
import { EncryptionModule } from "src/shared/infra/encryption/encryption.module";
import { ServiceModule } from "src/shared/services/service.module";

@Module({
  imports: [DatabaseModule, AuthModule, EncryptionModule, ServiceModule],
  controllers: [AppController, AccountController],
  providers: [
    LoginAccount,
    FetchLatestAppointment,
    UpdateAppointment,
    FetchAnalyticalData,
    GetAppointmentById,
    GetLatestAppointment,
    UpdateEmployee,
  ],
  exports: [],
})
export class AppModule {}
