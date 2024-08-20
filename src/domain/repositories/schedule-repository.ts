import { ISchedule, Schedule, ScheduleStatus } from "src/domain/entities/schedule";

export abstract class ScheduleRepository {
  abstract findById(id: string, status?: ScheduleStatus): Promise<Schedule | null>;
  abstract findByDate(branchId: string, date: Date, status?: ScheduleStatus): Promise<Schedule | null>;
  abstract findAll(branchId: string, status?: ScheduleStatus): Promise<Schedule[]>;
  abstract fetchByDate(branchId: string, dateStart: Date, dateEnd: Date, status?: ScheduleStatus): Promise<Schedule[]>;
  abstract fetchLatestFromUser(userId: string, status?: ScheduleStatus): Promise<Schedule[]>;
  abstract fetchLatest(branchId: string, status?: ScheduleStatus): Promise<Schedule[]>;
  abstract fetchByUserId(userId: string, status?: ScheduleStatus): Promise<Schedule[]>;
  abstract create(schedule: Schedule): Promise<void>;
  abstract update(id: string, schedule: Partial<ISchedule>): Promise<void>;
}
