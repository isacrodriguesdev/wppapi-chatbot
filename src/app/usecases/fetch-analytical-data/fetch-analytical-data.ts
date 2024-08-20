import { Injectable } from "@nestjs/common";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { UserRepository } from "src/domain/repositories/user-repository";

@Injectable()
export class FetchAnalyticalData {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async execute(companyId: string, branchId: string): Promise<any> {
    const startDate = new Date();
    startDate.setDate(5);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const users = await this.userRepository.fetchByCompanyId(companyId);
    const schedules = await this.scheduleRepository.fetchByDate(branchId, startDate, endDate);

    const totalUsers = users.length;

    const totalScheduled = schedules.filter((schedule) => schedule.status === "scheduled").length;
    const totalCanceled = schedules.filter((schedule) => schedule.status === "canceled").length;
    const totalCompleted = schedules.filter((schedule) => schedule.status === "done").length;

    const totalRevenue = schedules
      .filter((schedule) => schedule.status === "done")
      .reduce((total, schedule) => total + schedule.service.price, 0);

    const userSummary = {
      total: totalUsers,
    };

    const filteredAppontments = schedules.filter((schedule, index, self) => {
      return self.findIndex((t) => t.user.id === schedule.user.id) === index;
    });

    const conversionRate = (filteredAppontments.length / totalUsers) * 100;

    const scheduleSummary = {
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
      scheduleSummary,
      financialSummary,
    };
  }
}
