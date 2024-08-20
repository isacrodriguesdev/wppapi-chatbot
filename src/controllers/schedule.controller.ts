import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { FetchLatestSchedule } from "src/app/usecases/fetch-latest-schedule/fetch-latest-schedule";
import { GetScheduleById } from "src/app/usecases/get-schedule-by-id/get-schedule-by-id";
import { GetLatestSchedule } from "src/app/usecases/get-latest-schedule/get-latest-schedule";
import { UpdateSchedule } from "src/app/usecases/update-schedule/update-schedule";
import { ISchedule } from "src/domain/entities/schedule";
import { JwtGuard } from "src/shared/infra/auth/passport-jwt/jwt.guard";

@Controller()
export class ScheduleController {
  constructor(
    private readonly fetchLatestSchedule: FetchLatestSchedule,
    private readonly updateSchedule: UpdateSchedule,
    private readonly getScheduleById: GetScheduleById,
    private readonly getLatestSchedule: GetLatestSchedule,
  ) {}

  @UseGuards(JwtGuard)
  @Get("schedules/latest")
  async _fetchLatestSchedules(@Request() request: any): Promise<Partial<ISchedule>[]> {
    const user = request.user;

    const schedules = await this.fetchLatestSchedule.execute(user.branchId);
    const dataDto = schedules.map((schedule) => schedule.serialize());
    return dataDto.map((schedule) => {
      return schedule;
    });
  }

  @UseGuards(JwtGuard)
  @Put("schedule/:id")
  async _updateSchedule(@Param() params: any, @Body() body: any): Promise<void> {
    const { id } = params;
    await this.updateSchedule.execute(id, body);
  }

  @UseGuards(JwtGuard)
  @Get("schedule/:id")
  async _getScheduleById(@Param() params: any): Promise<Partial<ISchedule>> {
    const { id } = params;
    const schedule = await this.getScheduleById.execute(id);
    return schedule.serialize({ user: true, service: true, branch: true });
  }

  @UseGuards(JwtGuard)
  @Get("schedule/latest")
  async _getLatestSchedule(@Request() request: any): Promise<Partial<ISchedule>> {
    const user = request.user;
    const schedule = await this.getLatestSchedule.execute(user.branchId);
    return schedule.serialize({ user: true, service: true, branch: true });
  }
}
