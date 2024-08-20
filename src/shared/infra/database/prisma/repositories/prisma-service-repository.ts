import { Service } from "src/domain/entities/service";
import { ServiceRepository } from "src/domain/repositories/service-repository";
import { PrismaServiceRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-service-repository-mapper";
import { prisma } from "src/shared/infra/database/prisma/prisma-service";

export class PrismaServiceRepository implements ServiceRepository {
  async findById(id: string): Promise<Service> {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    return PrismaServiceRepositoryMapper.toDomain(service);
  }

  async findAll(branchId: string): Promise<Service[]> {
    const services = await prisma.service.findMany({
      where: {
        branchId,
      },
    });

    return services.map(PrismaServiceRepositoryMapper.toDomain);
  }
}
