import { Injectable } from "@nestjs/common";
import { ISchedule } from "src/domain/entities/schedule";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { NotFoundError } from "src/shared/exceptions/not-found-error";

@Injectable()
export class UpdateSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(id: string, data: Partial<ISchedule>): Promise<void> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule) {
      throw new NotFoundError();
    }

    await this.scheduleRepository.update(schedule.id, data);
  }
}
