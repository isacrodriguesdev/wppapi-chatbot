export abstract class PasswordEncryption {
  abstract encrypt(password: string): Promise<string>;
  abstract compare(password: string, encryptedPassword: string): Promise<boolean>;
}
