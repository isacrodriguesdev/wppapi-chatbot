import { Module } from "@nestjs/common";
import { LoginAccount } from "@/app/usecases/LoginAccount";
import GetUserByPhone from "@/app/usecases/GetUserByPhone";
import SaveUser from "@/app/usecases/SaveUser";
import { AccountController } from "@/controllers/account.controller";
import { AppController } from "@/controllers/app.controller";
import { AuthModule } from "@/shared/infra/auth/auth.module";
import { DatabaseModule } from "@/shared/infra/database/database.module";
import { EncryptionModule } from "@/shared/infra/encryption/encryption.module";
import { ServiceModule } from "@/shared/services/service.module";
import { PhoneNumberBRHelper } from "@/shared/helpers/PhoneNumberBRHelper";
import { PhoneNumberHelper } from "@/interfaces/PhoneNumberHelper";
import { UserController } from "@/controllers/user.controller";
import GetBranchById from "@/app/usecases/GetBranchById";
import { BranchController } from "@/controllers/branch.controller";

@Module({
  imports: [DatabaseModule, AuthModule, EncryptionModule, ServiceModule],
  controllers: [AppController, AccountController, UserController, BranchController],
  providers: [
    LoginAccount,
    GetBranchById,
    GetUserByPhone,
    SaveUser,
    {
      useClass: PhoneNumberBRHelper,
      provide: PhoneNumberHelper,
    },
  ],
  exports: [],
})
export class AppModule {}
