import { BaseEntity } from "@/domain/entities/BaseEntity";
import { User } from "@/domain/entities/User";
import UserRepository from "@/domain/repositories/UserRepository";
import PrismaUserRepositoryMapper from "@/shared/infra/database/prisma/mappers/PrismaUserRepositoryMapper";
import PrismaService from "@/shared/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByPhone(phone: string, branchId: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { phone, branchId: BaseEntity.toBuffer(branchId) },
    });

    if (!user) {
      return null;
    }

    return PrismaUserRepositoryMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const userSerialized = PrismaUserRepositoryMapper.toPersistence(user);
    await this.prismaService.user.upsert({
      where: { id: BaseEntity.toBuffer(user.id) },
      create: userSerialized,
      update: {
        ...userSerialized,
        id: undefined,
        branchId: undefined,
        createdAt: undefined,
        updatedAt: new Date(),
      },
    });
  }
}
