import { Branch } from "src/domain/entities/branch";
import { PrismaServiceRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-service-repository-mapper";

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
        services: branch.services?.map(PrismaServiceRepositoryMapper.toDomain),
      },
      branch.id,
    );
  }
}
