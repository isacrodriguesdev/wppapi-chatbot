import { TicketMessage } from "src/domain/entities/ticket-message";

export abstract class TicketMessageRepository {
  abstract create(message: TicketMessage): Promise<void>;
  abstract fetchByTicketId(ticketId: string, limit?: number): Promise<TicketMessage[]>;
}
