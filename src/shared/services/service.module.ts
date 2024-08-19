import { Module } from "@nestjs/common";
import { NewMessageHandler } from "src/app/hadlers/new-message/new-message-handler";
import { SocketGateway } from "src/shared/services/gateway/socket.gateway";

@Module({
  providers: [SocketGateway, NewMessageHandler],
})
export class ServiceModule {}
