import { Injectable } from "@nestjs/common";
import { Schedule } from "src/domain/entities/schedule";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { NotFoundError } from "src/shared/exceptions/not-found-error";

@Injectable()
export class GetScheduleById {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(id: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundError();
    }

    return schedule;
  }
}
