import { Branch } from "src/domain/entities/branch";
import { PrismaOperatingDayRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-operating-day-repository-mapper";
import { PrismaServiceRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-service-repository-mapper";
import { PrismaEmployeeRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-employee-repository-mapper";

export class PrismaBranchRepositoryMapper {
  static toDomain(branch: any): Branch {
    return new Branch(
      {
        companyId: branch.companyId,
        name: branch.name,
        phone: branch.phone,
        zipCode: branch.zipCode,
        complement: branch.complement,
        state: branch.state,
        city: branch.city,
        geoLocation: branch.geoLocation,
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt,
        operatingDays: branch.operatingDays && branch.operatingDays.map(PrismaOperatingDayRepositoryMapper.toDomain),
        services: branch.services && branch.services.map(PrismaServiceRepositoryMapper.toDomain),
        employees: branch.employees && branch.employees.map(PrismaEmployeeRepositoryMapper.toDomain),
      },
      branch.id,
    );
  }
}
