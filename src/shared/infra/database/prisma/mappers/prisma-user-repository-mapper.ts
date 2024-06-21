import { User } from "src/domain/entities/user";

export class PrismaUserRepositoryMapper {
  static toDomain(user: any): User {
    return new User(
      {
        name: user.name,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
        companyId: user.companyId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
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
    };
  }
}
