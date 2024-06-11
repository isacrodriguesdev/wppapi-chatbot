import { Appointment } from "src/domain/entities/appointment";
import { PrismaBranchRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-branch-repository-mapper";
import { PrismaServiceRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-service-repository-mapper";
import { PrismaUserRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-user-repository-mapper";

export class PrismaAppointmentRepositoryMapper {
  static toDomain(schedule: any): Appointment {
    return new Appointment(
      {
        status: schedule.status,
        userId: schedule.userId,
        companyId: schedule.companyId,
        serviceId: schedule.serviceId,
        branchId: schedule.branchId,
        date: schedule.date,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
        service: PrismaServiceRepositoryMapper.toDomain(schedule.service),
        user: PrismaUserRepositoryMapper.toDomain(schedule.user),
        branch: PrismaBranchRepositoryMapper.toDomain(schedule.branch),
      },
      schedule.id,
    );
  }
}
