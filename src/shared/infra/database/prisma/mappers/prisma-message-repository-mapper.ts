import { MessageFactory } from "src/app/factories/message-factory";
import { Message } from "src/domain/entities/message";
import { PrismaMessageOptionRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-message-option-repository-mapper";

export class PrismaMessageRepositoryMapper {
  static toDomain(message: any): Message {
    const correctedContent = message.content.replace(/\\n/g, "\n");
    return MessageFactory.create({
      id: message.id,
      branchId: message.branchId,
      group: message.group,
      name: message.name,
      contents: correctedContent
        .split("\n")
        .filter((line: string) => line !== "")
        .map((line) => line + "\n"), // Garantindo que cada linha termine com \n
      actions: message.actions,
      options: message.options
        ? message.options.map((option: any) => PrismaMessageOptionRepositoryMapper.toDomain(option))
        : null,
    });
  }
}
