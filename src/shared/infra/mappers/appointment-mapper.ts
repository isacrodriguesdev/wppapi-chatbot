import { Schedule, ISchedule } from "src/domain/entities/schedule";
import { IService } from "src/domain/entities/service";
import { IUser } from "src/domain/entities/user";
import { ServiceMapper } from "src/shared/infra/mappers/service-mapper";
import { UserMapper } from "src/shared/infra/mappers/user-mapper";

export class ScheduleMapper {
  static toDTO(schedule: Schedule): Partial<ISchedule> {
    return {
      id: schedule.id,
      status: schedule.status,
      userId: schedule.userId,
      companyId: schedule.companyId,
      serviceId: schedule.serviceId,
      branchId: schedule.branchId,
      date: schedule.date,
      service: ServiceMapper.toDTO(schedule.service) as IService,
      user: UserMapper.toDTO(schedule.user) as IUser,
      // branch: schedule.branch,
    };
  }
}
