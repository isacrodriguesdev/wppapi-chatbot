import { Module } from "@nestjs/common";
import { FetchLatestAppointment } from "src/app/usecases/fetch-latest-appointment/fetch-latest-appointment";
import { LoginAccount } from "src/app/usecases/login-account/login-account";
import { UpdateAppointment } from "src/app/usecases/update-appointment/update-appointment";
import { AccountController } from "src/controllers/account.controller";
import { AppController } from "src/controllers/app.controller";
import { AuthModule } from "src/shared/infra/auth/auth.module";
import { DatabaseModule } from "src/shared/infra/database/database.module";
import { EncryptionModule } from "src/shared/infra/encryption/encryption.module";

@Module({
  imports: [DatabaseModule, AuthModule, EncryptionModule],
  controllers: [AppController, AccountController],
  providers: [LoginAccount, FetchLatestAppointment, UpdateAppointment],
  exports: [],
})
export class AppModule {}
