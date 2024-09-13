import { User } from "@/domain/entities/User";
import UserRepository from "@/domain/repositories/UserRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class SaveUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
