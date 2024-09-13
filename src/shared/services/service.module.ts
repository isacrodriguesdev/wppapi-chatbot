import { Module } from "@nestjs/common";
import { PhoneNumberHelper } from "@/interfaces/PhoneNumberHelper";
import { PhoneNumberBRHelper } from "@/shared/helpers/PhoneNumberBRHelper";
import { DatabaseModule } from "@/shared/infra/database/database.module";
import { SocketGateway } from "@/shared/services/gateway/socket.gateway";

@Module({
  imports: [DatabaseModule],
  providers: [
    SocketGateway,
    {
      useClass: PhoneNumberBRHelper,
      provide: PhoneNumberHelper,
    },
  ],
  exports: [SocketGateway],
})
export class ServiceModule {}
