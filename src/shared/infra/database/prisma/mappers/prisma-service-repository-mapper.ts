import { Service } from "src/domain/entities/service";

export class PrismaServiceRepositoryMapper {
  static toDomain(service: any): Service {
    return new Service(
      {
        name: service.name,
        branchId: service.branchId,
        duration: service.duration,
        price: service.price,
        companyId: service.companyId,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
      },
      service.id,
    );
  }
}
