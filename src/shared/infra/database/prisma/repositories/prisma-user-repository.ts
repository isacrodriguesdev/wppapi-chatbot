import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchByCompanyId(companyId: string): Promise<any> {
    const users = await this.prismaService.user.findMany({
      where: { companyId },
      select: { id: true, name: true, phone: true, avatar: true },
    });

    return users;
  }
}
