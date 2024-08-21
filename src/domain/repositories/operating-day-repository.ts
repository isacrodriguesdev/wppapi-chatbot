import { OperatingDay } from "src/domain/entities/operating-day";

export abstract class OperatingDayRepository {
  abstract findAll(branchId: string): Promise<OperatingDay[]>;
  abstract findByWeekDay(branchId: string, weekDay: string): Promise<OperatingDay>;
}
