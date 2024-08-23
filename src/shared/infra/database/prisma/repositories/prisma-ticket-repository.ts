import { TicketRepository } from "src/domain/repositories/ticket-repository";
import { ITicket, Ticket } from "src/domain/entities/ticket";
import { PrismaTicketRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-ticket-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaTicketRepository implements TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: string): Promise<Ticket | null> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: { user: true, department: true, ticketAssignments: true },
    });

    if (!ticket) {
      return null;
    }

    return PrismaTicketRepositoryMapper.toDomain(ticket);
  }

  async create(ticket: Ticket): Promise<void> {
    await this.prisma.ticket.create({
      data: PrismaTicketRepositoryMapper.toPersistence(ticket),
    });
  }

  async findByUserId(userId: string, branchId: string, status: string = ITicket.Status.OPEN): Promise<Ticket | null> {
    const ticket = await this.prisma.ticket.findFirst({
      where: { userId, branchId, status },
      include: { user: true, department: true, ticketAssignments: true },
    });

    if (!ticket) {
      return null;
    }

    return PrismaTicketRepositoryMapper.toDomain(ticket);
  }

  async fetchByBranchId(branchId: string): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: { branchId },
      include: {
        user: true,
        department: true,
        ticketAssignments: {
          include: { user: true },
        },
      },
    });

    return tickets.map((ticket) =>
      PrismaTicketRepositoryMapper.toDomain({
        ...ticket,
        assignment: ticket.ticketAssignments[0]?.user,
      }),
    );
  }
}
