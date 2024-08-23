import { Injectable } from "@nestjs/common";
import { Ticket } from "src/domain/entities/ticket";
import { TicketRepository } from "src/domain/repositories/ticket-repository";

@Injectable()
export class FetchTicket {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async execute(branchId: string): Promise<any[]> {
    try {
      const tickets = await this.ticketRepository.fetchByBranchId(branchId);
      return tickets.map(this.toDTO);
    } catch (error) {
      throw error;
    }
  }

  private toDTO(ticket: Ticket) {
    return {
      ...ticket.serialize(),
      user: ticket.user.serialize(),
      department: ticket.department.serialize(),
      assignment: ticket.assignment?.serialize() ?? null,
    };
  }
}
