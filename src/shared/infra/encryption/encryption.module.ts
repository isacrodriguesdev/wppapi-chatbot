import { Module } from "@nestjs/common";
import { PasswordEncryption } from "@/domain/interfaces/PasswordEncryption";
import { BcryptPasswordEncryption } from "@/shared/infra/encryption/bcrypt/bcrypt-password-encryption";

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
