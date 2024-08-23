import { BaseEntity } from "src/domain/entities/base-entity";
import { Branch } from "src/domain/entities/branch";
import { Company } from "src/domain/entities/company";
import { CompanyRepository } from "src/domain/repositories/company-repository";
import { PrismaBranchRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-branch-repository-mapper";
import { PrismaCompanyRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-company-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(companyId: string): Promise<Company> {
    const company = await this.prisma.company.findUnique({
      where: { id: BaseEntity.toBuffer(companyId) },
      include: { branchs: true },
    });

    return PrismaCompanyRepositoryMapper.toDomain(company);
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      include: { branchs: true },
    });

    return companies.map(PrismaCompanyRepositoryMapper.toDomain);
  }

  async fetchBranches(companyId: string): Promise<Branch[]> {
    const branches = await this.prisma.branch.findMany({
      where: { companyId: BaseEntity.toBuffer(companyId) },
      include: { employees: true },
    });

    return branches.map(PrismaBranchRepositoryMapper.toDomain);
  }
}
