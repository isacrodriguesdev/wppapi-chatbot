import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { FetchAnalyticalData } from "src/app/usecases/fetch-analytical-data/fetch-analytical-data";
import { FetchLatestAppointment } from "src/app/usecases/fetch-latest-appointment/fetch-latest-appointment";
import { GetAppointmentById } from "src/app/usecases/get-appointment-by-id/get-appointment-by-id";
import { GetLatestAppointment } from "src/app/usecases/get-latest-appointment/get-latest-appointment";
import { UpdateAppointment } from "src/app/usecases/update-appointment/update-appointment";
import { IAppointment } from "src/domain/entities/appointment";
import { JwtGuard } from "src/shared/infra/auth/passport-jwt/jwt.guard";
import { AppointmentMapper } from "src/shared/infra/mappers/appointment-mapper";

@Controller()
export class AppController {
  constructor(
    private readonly fetchLatestAppointment: FetchLatestAppointment,
    private readonly updateAppointment: UpdateAppointment,
    private readonly fetchAnalyticalData: FetchAnalyticalData,
    private readonly getAppointmentById: GetAppointmentById,
    private readonly getLatestAppointment: GetLatestAppointment,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return "Hello World!";
  }

  @UseGuards(JwtGuard)
  @Get("appointments/latest")
  async _fetchLatestAppointment(@Request() request: any): Promise<Partial<IAppointment>[]> {
    const user = request.user;

    const appointments = await this.fetchLatestAppointment.execute(user.branchId);
    const dataDto = appointments.map((appointment) => AppointmentMapper.toDTO(appointment));
    return dataDto.map((appointment) => {
      delete appointment.user.details;
      return appointment;
    });
  }

  @UseGuards(JwtGuard)
  @Put("appointments/:id")
  async _updateAppointment(@Param() params: any, @Body() body: any): Promise<void> {
    const { id } = params;
    await this.updateAppointment.execute(id, body);
  }

  // FetchAnalyticalData
  @UseGuards(JwtGuard)
  @Get("analytical-data")
  async _fetchAnalyticalData(@Request() request: any): Promise<any> {
    const user = request.user;
    console.log(user);
    return this.fetchAnalyticalData.execute(user.companyId, user.branchId);
  }

  // GetAppointmentById
  @UseGuards(JwtGuard)
  @Get("appointments/:id")
  async _getAppointmentById(@Param() params: any): Promise<Partial<IAppointment>> {
    const { id } = params;
    const appointment = await this.getAppointmentById.execute(id);
    return AppointmentMapper.toDTO(appointment);
  }

  // GetLatestAppointment
  @UseGuards(JwtGuard)
  @Get("appointment/latest")
  async _getLatestAppointment(@Request() request: any): Promise<Partial<IAppointment>> {
    const user = request.user;
    const appointment = await this.getLatestAppointment.execute(user.branchId);
    return AppointmentMapper.toDTO(appointment);
  }
}
