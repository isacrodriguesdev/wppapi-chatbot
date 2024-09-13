export abstract class Authorization {
  abstract validate<T>(token: string): Promise<T>;
  abstract sign<T>(payload: Partial<T>, expiresIn: string): Promise<string>;
  abstract decode<T>(token: string): Promise<T>;
}
