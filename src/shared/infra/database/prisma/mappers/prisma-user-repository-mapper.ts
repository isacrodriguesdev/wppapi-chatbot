import { PrismaUserProfileRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-user-profile-repository-mapper";
import { User } from "src/domain/entities/user";

export class PrismaUserRepositoryMapper {
  static toDomain(user: any): User {
    return new User(
      {
        name: user.name,
        phone: user.phone,
        companyId: user.companyId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profile: user.profile ? PrismaUserProfileRepositoryMapper.toDomain(user.profile) : null,
      },
      user.id,
    );
  }

  static toPersistence(user: User): any {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      companyId: user.companyId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
