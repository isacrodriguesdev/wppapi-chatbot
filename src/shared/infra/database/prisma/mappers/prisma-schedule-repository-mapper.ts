import { Schedule } from "src/domain/entities/schedule";
import { PrismaServiceRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-service-repository-mapper";
import { PrismaUserRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-user-repository-mapper";
import { PrismaCompanyRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-company-repository-mapper";
import { PrismaBranchRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-branch-repository-mapper";

export class PrismaScheduleRepositoryMapper {
  static toDomain(schedule: any): Schedule {
    return new Schedule(
      {
        status: schedule.status,
        userId: schedule.userId,
        companyId: schedule.companyId,
        serviceId: schedule.serviceId,
        branchId: schedule.branchId,
        date: schedule.date,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
        service: schedule.service ? PrismaServiceRepositoryMapper.toDomain(schedule.service) : null,
        user: schedule.user ? PrismaUserRepositoryMapper.toDomain(schedule.user) : null,
        branch: schedule.branch ? PrismaBranchRepositoryMapper.toDomain(schedule.branch) : null,
      },
      schedule.id,
    );
  }
}
