import { Injectable } from "@nestjs/common";
import { Appointment, IAppointment } from "src/domain/entities/appointment";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { PrismaAppointmentRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-appointment-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getLatest(branchId: string, status?: IAppointment.Status): Promise<Appointment | null> {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const results = await this.prisma.schedule.findMany({
      where: {
        branchId,
        status,
        date: {
          gte: startOfToday,
          lte: startOfTomorrow,
        },
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true, avatar: true, details: true },
        },
        branch: true,
        service: true,
      },
    });

    const upcomingAppointments = results
      .filter((appointment) => new Date(appointment.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const latestAppointment = upcomingAppointments[0];

    if (!latestAppointment) return null;

    return PrismaAppointmentRepositoryMapper.toDomain(latestAppointment);
  }

  async fetchByRangeDate(
    branchId: string,
    startDate: Date,
    endDate: Date,
    status?: IAppointment.Status,
  ): Promise<Appointment[]> {
    const appointments = await this.prisma.schedule.findMany({
      where: {
        branchId,
        status,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true, avatar: true, details: true },
        },
        branch: true,
        service: true,
      },
    });
    return appointments.map(PrismaAppointmentRepositoryMapper.toDomain);
  }

  async fetchLatest(branchId: string, status?: IAppointment.Status): Promise<Appointment[]> {
    const appointments = await this.prisma.schedule.findMany({
      where: { branchId, status, date: { gte: new Date() } },
      select: {
        id: true,
        status: true,
        date: true,
        user: { select: { id: true, name: true, phone: true, avatar: true, details: true } },
        branch: { select: { id: true, name: true } },
        service: { select: { id: true, name: true, duration: true, price: true } },
      },
    });
    return appointments.map(PrismaAppointmentRepositoryMapper.toDomain);
  }

  async findById(id: string, status?: IAppointment.Status): Promise<Appointment | null> {
    const appointment = await this.prisma.schedule.findUnique({
      where: { id, status },
      include: {
        user: {
          select: { id: true, name: true, phone: true, avatar: true, details: true },
        },
        branch: true,
        service: true,
      },
    });

    if (!appointment) return null;

    return PrismaAppointmentRepositoryMapper.toDomain(appointment);
  }

  async fetchLatestFromUser(userId: string, status?: IAppointment.Status): Promise<Appointment[]> {
    const appointments = await this.prisma.schedule.findMany({
      where: {
        userId,
        status,
        date: { gte: new Date() },
      },
      include: {
        user: {
          include: { details: true },
        },
        branch: true,
        service: true,
      },
    });
    return appointments.map(PrismaAppointmentRepositoryMapper.toDomain);
  }

  async fetchByUserId(userId: string, status?: IAppointment.Status): Promise<Appointment[]> {
    const appointments = await this.prisma.schedule.findMany({
      where: { userId, status },
    });
    return appointments.map(PrismaAppointmentRepositoryMapper.toDomain);
  }

  async update(id: string, schedule: Partial<IAppointment>): Promise<void> {
    await this.prisma.schedule.update({
      where: { id },
      data: {
        status: schedule.status,
        date: schedule.date,
        updatedAt: new Date(),
      },
    });
  }
}
