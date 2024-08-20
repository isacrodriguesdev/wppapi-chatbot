import { Employee } from "src/domain/entities/employee";
import { PrismaCompanyRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-company-repository-mapper";
import { PrismaBranchRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-branch-repository-mapper";

export class PrismaEmployeeRepositoryMapper {
  static toDomain(employee: any): Employee {
    return new Employee(
      {
        name: employee.name,
        phone: employee.phone,
        avatar: employee.avatar,
        email: employee.email,
        password: employee.password,
        branchId: employee.branchId,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
        company: employee.company ? PrismaCompanyRepositoryMapper.toDomain(employee.company) : null,
        branch: employee.branch ? PrismaBranchRepositoryMapper.toDomain(employee.branch) : null,
      },
      employee.id,
    );
  }
}
