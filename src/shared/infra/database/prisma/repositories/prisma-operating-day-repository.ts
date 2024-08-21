import { OperatingDay } from "src/domain/entities/operating-day";
import { OperatingDayRepository } from "src/domain/repositories/operating-day-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaOperatingDayRepository implements OperatingDayRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(branchId: string): Promise<OperatingDay[]> {
    const operatingDay = await this.prisma.branchOperatingDay.findMany({
      where: {
        branchId,
      },
    });

    if (!operatingDay) {
      return null;
    }

    return operatingDay.map((period) => new OperatingDay(period));
  }

  async findByWeekDay(branchId: string, weekDay: string): Promise<OperatingDay> {
    const operatingDay = await this.prisma.branchOperatingDay.findFirst({
      where: {
        branchId,
        weekDay: weekDay.toLowerCase(),
      },
    });

    if (!operatingDay) {
      return null;
    }

    return new OperatingDay(operatingDay);
  }
}
