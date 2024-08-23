import { Ticket } from "src/domain/entities/ticket";

export class PrismaTicketRepositoryMapper {
  static toPersistence(ticket: Ticket): any {
    return {
      id: ticket.id,
      userId: ticket.userId,
      branchId: ticket.branchId,
      status: ticket.status,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
  }

  static toDomain(ticket: any): Ticket {
    return new Ticket(
      {
        userId: ticket.userId,
        branchId: ticket.branchId,
        departmentId: ticket.departmentId,
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        user: ticket.user,
        department: ticket.department,
      },
      ticket.id,
    );
  }
}
