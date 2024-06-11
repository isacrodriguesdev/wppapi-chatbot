import { OperatingDay } from "src/domain/entities/operating-day";

export class PrismaOperatingDayRepositoryMapper {
  static toDomain(operatingDay: any): OperatingDay {
    return new OperatingDay(
      {
        companyId: operatingDay.companyId,
        branchId: operatingDay.branchId,
        weekDay: operatingDay.weekDay,
        startTime: operatingDay.startTime,
        endTime: operatingDay.endTime,
        createdAt: operatingDay.createdAt,
        updatedAt: operatingDay.updatedAt,
      },
      operatingDay.id,
    );
  }
}
