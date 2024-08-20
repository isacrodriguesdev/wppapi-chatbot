import { prisma } from "src/shared/infra/database/prisma/prisma-service";
import { Message } from "src/domain/entities/message";
import { MessageRepository } from "src/domain/repositories/message-repository";
import { PrismaMessageRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-message-repository-mapper";

export class PrismaMessageRepository implements MessageRepository {
  public async fetchByGroup(group: string, branchId?: string): Promise<Message[]> {
    if (branchId) {
      const customMessages = await prisma.customMessage.findMany({
        where: { group, branchId },
        include: { options: true },
      });

      return customMessages.map(PrismaMessageRepositoryMapper.toDomain);
    }

    const predefinedMessages = await prisma.predefinedMessage.findMany({
      where: { group },
      include: { options: true },
    });

    return predefinedMessages.map(PrismaMessageRepositoryMapper.toDomain);
  }

  async find(name: string, branchId?: string): Promise<Message> {
    if (branchId) {
      const customMessages = await prisma.customMessage.findFirst({
        where: { name, branchId },
        include: { options: true },
      });

      if (!customMessages) {
        const predefinedMessages = await prisma.predefinedMessage.findFirst({
          where: { name },
          include: { options: true },
        });
        return PrismaMessageRepositoryMapper.toDomain(predefinedMessages);
      }

      return PrismaMessageRepositoryMapper.toDomain(customMessages);
    }

    const predefinedMessages = await prisma.predefinedMessage.findFirst({
      where: { name },
    });

    return PrismaMessageRepositoryMapper.toDomain(predefinedMessages);
  }
}
