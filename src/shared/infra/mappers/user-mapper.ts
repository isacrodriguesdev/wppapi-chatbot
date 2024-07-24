import { IUser, User } from "src/domain/entities/user";

export class UserMapper {
  static toDTO(user: User): Partial<IUser> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      details: user.details && user.details.serialize(),
    };
  }
}
