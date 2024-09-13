import { BaseEntity } from "@/domain/entities/BaseEntity";
import { Branch } from "@/domain/entities/Branch";
import BranchRepository from "@/domain/repositories/BranchRepository";
import { PrismaBranchRepositoryMapper } from "@/shared/infra/database/prisma/mappers/PrismaBranchRepositoryMapper";
import PrismaService from "@/shared/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class PrismaBranchRepository implements BranchRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: string): Promise<Branch | null> {
    const branch = await this.prismaService.branch.findUnique({
      where: { id: BaseEntity.toBuffer(id) },
    });

    if (!branch) {
      return null;
    }

    return PrismaBranchRepositoryMapper.toDomain(branch);
  }
}
