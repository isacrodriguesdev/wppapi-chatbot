import { TicketRepository } from "src/domain/repositories/ticket-repository";
import { ITicket, Ticket } from "src/domain/entities/ticket";
import { PrismaTicketRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-ticket-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaTicketRepository implements TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(ticket: Ticket): Promise<void> {
    await this.prisma.ticket.create({
      data: PrismaTicketRepositoryMapper.toPersistence(ticket),
    });
  }

  async findByUserId(userId: string, branchId: string, status: string = ITicket.Status.OPEN): Promise<Ticket | null> {
    const ticket = await this.prisma.ticket.findFirst({
      where: { userId, branchId, status },
    });

    if (!ticket) {
      return null;
    }

    return PrismaTicketRepositoryMapper.toDomain(ticket);
  }

  async fetchByBranchId(branchId: string): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: { branchId },
    });

    return tickets.map((ticket) => PrismaTicketRepositoryMapper.toDomain(ticket));
  }
}
