import { Branch } from "src/domain/entities/branch";
import { Company } from "src/domain/entities/company";
import { CompanyRepository } from "src/domain/repositories/company-repository";
import { PrismaBranchRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-branch-repository-mapper";
import { PrismaCompanyRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-company-repository-mapper";
import { prisma } from "src/shared/infra/database/prisma/prisma-service";

export class PrismaCompanyRepository implements CompanyRepository {
  async findById(companyId: string): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: { branchs: true },
    });

    return PrismaCompanyRepositoryMapper.toDomain(company);
  }

  async findAll(): Promise<Company[]> {
    const companies = await prisma.company.findMany({
      include: { branchs: true },
    });

    return companies.map(PrismaCompanyRepositoryMapper.toDomain);
  }

  async fetchBranches(companyId: string): Promise<Branch[]> {
    const branches = await prisma.branch.findMany({
      where: { companyId },
      include: { employees: true },
    });

    return branches.map(PrismaBranchRepositoryMapper.toDomain);
  }
}
