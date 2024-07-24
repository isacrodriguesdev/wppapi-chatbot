import { User } from "src/domain/entities/user";

export abstract class UserRepository {
  abstract fetchByCompanyId(companyId: string): Promise<User[]>;
}
