import { BaseEntity } from "@/domain/entities/BaseEntity";
import { User } from "@/domain/entities/User";

export default class PrismaUserRepositoryMapper {
  static toDomain(user: any): User {
    return new User(
      {
        name: user.name,
        profileImage: user.profileImage,
        birthDate: user.birthDate,
        cpf: user.cpf,
        email: user.email,
        phone: user.phone,
        active: user.active,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        branchId: BaseEntity.fromBuffer(user.branchId),
      },
      BaseEntity.fromBuffer(user.id),
    );
  }

  static toPersistence(user: User): any {
    return {
      id: BaseEntity.toBuffer(user.id),
      branchId: BaseEntity.toBuffer(user.branchId),
      name: user.name,
      profileImage: user.profileImage,
      birthDate: user.birthDate,
      cpf: user.cpf,
      email: user.email,
      phone: user.phone,
      active: user.active,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
