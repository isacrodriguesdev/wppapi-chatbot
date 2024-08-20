import { Ticket } from "src/domain/entities/ticket";

export abstract class TicketRepository {
  abstract create(ticket: Ticket): Promise<void>;
  abstract findByUserId(userId: string, branchId: string, status?: string): Promise<Ticket | null>;
  abstract fetchByBranchId(branchId: string): Promise<Ticket[]>;
}
