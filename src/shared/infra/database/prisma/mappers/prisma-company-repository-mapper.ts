import { Company } from "src/domain/entities/company";
import { PrismaBranchRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-branch-repository-mapper";

export class PrismaCompanyRepositoryMapper {
  static toDomain(company: any): Company {
    return new Company(
      {
        name: company.name,
        phone: company.phone,
        email: company.email,
        password: company.password,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        branchs: company.branchs.map(PrismaBranchRepositoryMapper.toDomain),
      },
      company.id,
    );
  }
}
