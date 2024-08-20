import { Schedule, ISchedule, ScheduleStatus } from "src/domain/entities/schedule";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { PrismaScheduleRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-schedule-repository-mapper";
import { prisma } from "src/shared/infra/database/prisma/prisma-service";

export class PrismaScheduleRepository implements ScheduleRepository {
  async fetchLatest(branchId: string, status?: ScheduleStatus): Promise<Schedule[]> {
    const schedules = await prisma.schedule.findMany({
      where: { branchId, status, date: { gte: new Date() } },
      include: { service: true, user: true, branch: true },
    });

    return schedules.map(PrismaScheduleRepositoryMapper.toDomain);
  }

  async fetchLatestFromUser(userId: string, status?: ScheduleStatus): Promise<Schedule[]> {
    const schedules = await prisma.schedule.findMany({
      where: { userId, status, date: { gte: new Date() } },
      include: { service: true, user: true, branch: true },
    });

    return schedules.map(PrismaScheduleRepositoryMapper.toDomain);
  }

  async findByDate(branchId: string, date: Date, status?: ScheduleStatus): Promise<Schedule | null> {
    const schedule = await prisma.schedule.findFirst({
      where: { branchId, date, status },
      include: { service: true, user: true, branch: true },
    });

    if (!schedule) return null;

    return PrismaScheduleRepositoryMapper.toDomain(schedule);
  }

  async findById(id: string, status?: ScheduleStatus): Promise<Schedule | null> {
    const schedule = await prisma.schedule.findUnique({
      where: { id, status },
      include: { service: true, user: true, branch: true },
    });

    if (!schedule) return null;
    return PrismaScheduleRepositoryMapper.toDomain(schedule);
  }

  async fetchByDate(
    branchId: string,
    dateStart: Date,
    dateEnd: Date,
    status: ScheduleStatus = ScheduleStatus.SCHEDULED,
  ): Promise<Schedule[]> {
    const schedules = await prisma.schedule.findMany({
      where: {
        branchId,
        status,
        date: {
          gte: dateStart,
          lt: dateEnd,
        },
      },
      include: { service: true, user: true, branch: true },
    });

    return schedules.map(PrismaScheduleRepositoryMapper.toDomain);
  }

  async fetchByUserId(userId: string, status?: ScheduleStatus): Promise<Schedule[]> {
    const schedules = await prisma.schedule.findMany({
      where: { userId, status },
      include: { service: true, user: true, branch: true },
    });

    return schedules.map(PrismaScheduleRepositoryMapper.toDomain);
  }

  async findAll(branchId: string, status?: ScheduleStatus): Promise<Schedule[]> {
    const schedules = await prisma.schedule.findMany({
      where: { branchId, status },
      include: { service: true, user: true, branch: true },
    });

    return schedules.map(PrismaScheduleRepositoryMapper.toDomain);
  }

  async create(schedule: Schedule): Promise<void> {
    await prisma.schedule.create({
      data: {
        id: schedule.id,
        status: schedule.status,
        branchId: schedule.branchId,
        userId: schedule.userId,
        serviceId: schedule.serviceId,
        date: schedule.date,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt,
      },
    });
  }

  async update(id: string, schedule: Partial<ISchedule>): Promise<void> {
    await prisma.schedule.update({
      where: { id },
      data: {
        status: schedule.status,
        date: schedule.date,
      },
    });
  }
}
