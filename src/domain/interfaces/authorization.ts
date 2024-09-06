import { IEmployee } from "src/domain/entities/employee";

export abstract class Authorization {
  abstract validate<T>(token: string): Promise<T>;
  abstract sign(payload: Partial<IEmployee>, expiresIn: string): Promise<string>;
  abstract decode<T>(token: string): Promise<T>;
}
