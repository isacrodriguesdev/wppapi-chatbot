import { Module } from "@nestjs/common";
import { NewMessageHandler } from "src/app/hadlers/new-message/new-message-handler";
import { CreateTicketMessage } from "src/app/usecases/create-ticket-message/create-ticket-message";
import { DatabaseModule } from "src/shared/infra/database/database.module";
import { SocketGateway } from "src/shared/services/gateway/socket.gateway";

@Module({
  imports: [DatabaseModule],
  providers: [SocketGateway, NewMessageHandler, CreateTicketMessage],
  exports: [],
})
export class ServiceModule {}
