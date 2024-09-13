import { Module } from "@nestjs/common";
import PrismaService from "@/shared/infra/database/prisma/prisma.service";
import UserRepository from "@/domain/repositories/UserRepository";
import PrismaUserRepository from "@/shared/infra/database/prisma/repositories/PrismaUserRepository";
import PrismaBranchRepository from "@/shared/infra/database/prisma/repositories/PrismaBranchRepository";
import BranchRepository from "@/domain/repositories/BranchRepository";

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: BranchRepository,
      useClass: PrismaBranchRepository,
    },
  ],
  exports: [UserRepository, BranchRepository],
})
export class DatabaseModule {}
