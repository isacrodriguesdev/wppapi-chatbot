import { PasswordEncryption } from "@/domain/interfaces/PasswordEncryption";
import * as bcrypt from "bcrypt";

export class BcryptPasswordEncryption implements PasswordEncryption {
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
