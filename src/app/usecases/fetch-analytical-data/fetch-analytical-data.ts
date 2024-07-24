import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { UserRepository } from "src/domain/repositories/user-repository";

@Injectable()
export class FetchAnalyticalData {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(companyId: string, branchId: string): Promise<any> {
    const startDate = new Date();
    startDate.setDate(5);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const users = await this.userRepository.fetchByCompanyId(companyId);
    const appointments = await this.appointmentRepository.fetchByRangeDate(branchId, startDate, endDate);

    const totalUsers = users.length;

    const totalScheduled = appointments.filter((appointment) => appointment.status === "scheduled").length;
    const totalCanceled = appointments.filter((appointment) => appointment.status === "canceled").length;
    const totalCompleted = appointments.filter((appointment) => appointment.status === "done").length;

    const totalRevenue = appointments
      .filter((appointment) => appointment.status === "done")
      .reduce((total, appointment) => total + appointment.service.price, 0);

    const userSummary = {
      total: totalUsers,
    };

    const filteredAppontments = appointments.filter((appointment, index, self) => {
      return self.findIndex((t) => t.user.id === appointment.user.id) === index;
    });

    const conversionRate = (filteredAppontments.length / totalUsers) * 100;

    const appointmentSummary = {
      totalScheduled,
      totalCanceled,
      totalCompleted,
      conversionRate,
    };

    const financialSummary = {
      totalRevenue,
    };

    return {
      userSummary,
      appointmentSummary,
      financialSummary,
    };
  }
}
