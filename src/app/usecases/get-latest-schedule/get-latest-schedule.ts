import { Injectable } from "@nestjs/common";
import { Schedule, ISchedule, ScheduleStatus } from "src/domain/entities/schedule";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { NotFoundError } from "src/shared/exceptions/not-found-error";

@Injectable()
export class GetLatestSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(branchId: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.fetchLatest(branchId, ScheduleStatus.SCHEDULED);
    if (schedule.length === 0) {
      throw new NotFoundError();
    }

    return schedule[0];
  }
}
