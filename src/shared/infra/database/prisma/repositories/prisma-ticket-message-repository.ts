import { ITicketMessage, TicketMessage } from "src/domain/entities/ticket-message";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";
import { TicketMessageRepository } from "src/domain/repositories/ticket-message-repository";
import { PrismaTicketMessageRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-ticket-message-repository-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaTicketMessageRepository implements TicketMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(message: TicketMessage): Promise<void> {
    await this.prisma.ticketMessage.create({
      data: PrismaTicketMessageRepositoryMapper.toPersistence(message),
    });
  }

  async fetchByTicketId(ticketId: string, limit?: number): Promise<TicketMessage[]> {
    const messages = await this.prisma.ticketMessage.findMany({
      where: {
        ticketId,
      },
      take: limit,
    });

    return messages.map((message) => PrismaTicketMessageRepositoryMapper.toDomain(message));
  }
}
