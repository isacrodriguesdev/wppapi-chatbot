import { User } from "src/domain/entities/user";
import { PrismaUserDetailsRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-user-details-repository-mapper";

export class PrismaUserRepositoryMapper {
  static toDomain(user: any): User {
    const _user = new User(
      {
        name: user.name,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
        companyId: user.companyId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        details: user.userDetails ? PrismaUserDetailsRepositoryMapper.toDomain(user.userDetails[0]) : null,
      },
      user.id,
    );
    return _user;
  }

  static toPersistence(user: User): any {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      avatar: user.avatar,
      companyId: user.companyId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userDetails: PrismaUserDetailsRepositoryMapper.toPersistence(user.details),
    };
  }
}
