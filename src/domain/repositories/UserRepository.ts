import { User } from "@/domain/entities/User";

export default abstract class UserRepository {
  abstract findByPhone(email: string, branchId: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
