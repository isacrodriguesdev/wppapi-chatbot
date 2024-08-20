import { Injectable } from "@nestjs/common";
import { Schedule } from "src/domain/entities/schedule";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";

@Injectable()
export class FetchLatestSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(branchId: string): Promise<Schedule[]> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const schedules = await this.scheduleRepository.fetchByDate(branchId, startDate, endDate);
    return schedules
      .filter((schedule) => schedule.status !== "canceled")
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .sort((a, b) => (a.status === "done" ? 1 : 0) - (b.status === "done" ? 1 : 0));
  }
}
