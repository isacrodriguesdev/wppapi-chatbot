import { Employee } from "src/domain/entities/employee";
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
        companyId: employee.companyId,
        branchId: employee.branchId,
        androidDeviceToken: employee.androidDeviceToken,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
        branch: PrismaBranchRepositoryMapper.toDomain(employee.branch),
      },
      employee.id,
    );
  }
}
