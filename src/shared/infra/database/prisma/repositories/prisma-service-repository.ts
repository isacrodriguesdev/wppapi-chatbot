import { Service } from "src/domain/entities/service";
import { ServiceRepository } from "src/domain/repositories/service-repository";
import { PrismaServiceRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-service-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    return PrismaServiceRepositoryMapper.toDomain(service);
  }

  async findAll(branchId: string): Promise<Service[]> {
    const services = await this.prisma.service.findMany({
      where: {
        branchId,
      },
    });

    return services.map(PrismaServiceRepositoryMapper.toDomain);
  }
}
