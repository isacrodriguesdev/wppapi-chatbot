import { Module } from "@nestjs/common";
import { PasswordEncryption } from "src/domain/interfaces/password-encryption";
import { BcryptPasswordEncryption } from "src/shared/infra/encryption/bcrypt/bcrypt-password-encryption";

@Module({
  providers: [
    {
      provide: PasswordEncryption,
      useClass: BcryptPasswordEncryption,
    },
  ],
  exports: [PasswordEncryption],
})
export class EncryptionModule {}
