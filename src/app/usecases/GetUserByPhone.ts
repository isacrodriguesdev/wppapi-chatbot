import { IUser } from "@/domain/entities/User";
import UserRepository from "@/domain/repositories/UserRepository";
import NotFoundError from "@/shared/exceptions/NotFoundError";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class GetUserByPhone {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(phone: string, branchId: string): Promise<IUser> {
    const user = await this.userRepository.findByPhone(phone, branchId);

    if (!user) {
      throw new NotFoundError();
    }

    return user.serialize();
  }
}
