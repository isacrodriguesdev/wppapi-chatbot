import { Injectable } from "@nestjs/common";
import { TicketMessage } from "src/domain/entities/ticket-message";
import { TicketMessageRepository } from "src/domain/repositories/ticket-message-repository";
import { TicketRepository } from "src/domain/repositories/ticket-repository";

@Injectable()
export class CreateTicketMessage {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly ticketMessageRepository: TicketMessageRepository,
  ) {}

  async execute(ticketId: string, message: any) {
    const ticket = await this.ticketRepository.find(ticketId);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const newMessage = new TicketMessage({
      userId: message.from,
      ticketId: ticketId,
      type: message.type,
      content: message.content,
    });

    await this.ticketMessageRepository.create(newMessage);
    return newMessage;
  }
}
