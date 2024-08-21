import { IUser, User } from "src/domain/entities/user";
import { UserRepository } from "src/domain/repositories/user-repository";
import { PrismaUserRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-user-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async fetchByCompanyId(companyId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { companyId },
      include: {
        profiles: { take: 1 },
      },
    });

    return users.map((user) =>
      PrismaUserRepositoryMapper.toDomain({
        ...user,
        profile: user.profiles[0],
      }),
    );
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        profiles: { take: 1 },
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserRepositoryMapper.toDomain({
      ...user,
      profile: user.profiles[0],
    });
  }

  async findByPhone(phone: string, companyId: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { phone, companyId },
      include: {
        profiles: { take: 1 },
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserRepositoryMapper.toDomain({
      ...user,
      profile: user.profiles[0],
    });
  }

  async create(user: any): Promise<any> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        companyId: user.companyId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profiles: {
          create: {
            id: user.profile.id,
          },
        },
      },
    });
    return createdUser;
  }

  async update(userId: string, user: Partial<IUser>): Promise<any> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: user,
    });

    return updatedUser;
  }
}
