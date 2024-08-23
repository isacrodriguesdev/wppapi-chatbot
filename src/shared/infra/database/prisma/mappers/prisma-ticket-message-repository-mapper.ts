import { TicketMessage } from "src/domain/entities/ticket-message";

export class PrismaTicketMessageRepositoryMapper {
  static toPersistence(ticketMessage: TicketMessage): any {
    return {
      id: ticketMessage.id,
      userId: ticketMessage.userId,
      ticketId: ticketMessage.ticketId,
      type: ticketMessage.type,
      content: ticketMessage.content,
      createdAt: ticketMessage.createdAt,
      updatedAt: ticketMessage.updatedAt,
    };
  }

  static toDomain(ticketMessage: any): TicketMessage {
    return new TicketMessage(
      {
        userId: ticketMessage.userId,
        ticketId: ticketMessage.ticketId,
        type: ticketMessage.type,
        content: ticketMessage.content,
        createdAt: ticketMessage.createdAt,
        updatedAt: ticketMessage.updatedAt,
      },
      ticketMessage.id,
    );
  }
}
