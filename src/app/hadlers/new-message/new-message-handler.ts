import { Injectable } from "@nestjs/common";
import { CreateTicketMessage } from "src/app/usecases/create-ticket-message/create-ticket-message";

export interface NewMessage {
  topic: string;
  payload: {
    from: string;
    type: string;
    content: string;
  };
}

@Injectable()
export class NewMessageHandler {
  constructor(private readonly createTicketMessage: CreateTicketMessage) {}

  async handle(message: NewMessage) {
    console.log("message", message);
    await this.createTicketMessage.execute(message.topic, message.payload);
  }
}
