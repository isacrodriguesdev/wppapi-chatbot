import { UserProfile, IUserProfile } from "src/domain/entities/user-profile";

export abstract class UserProfileRepository {
  abstract create(user: UserProfile): Promise<any>;
  abstract update(userId: string, user: Partial<Omit<IUserProfile, "id" | "userId">>): Promise<any>;
}
