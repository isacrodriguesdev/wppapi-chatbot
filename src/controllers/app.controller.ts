import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { FetchLatestAppointment } from "src/app/usecases/fetch-latest-appointment/fetch-latest-appointment";
import { UpdateAppointment } from "src/app/usecases/update-appointment/update-appointment";
import { IAppointment } from "src/domain/entities/appointment";
import { JwtGuard } from "src/shared/infra/auth/passport-jwt/jwt.guard";
import { AppointmentMapper } from "src/shared/infra/mappers/appointment-mapper";

@Controller()
export class AppController {
  constructor(
    private readonly fetchLatestAppointment: FetchLatestAppointment,
    private readonly updateAppointment: UpdateAppointment,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return "Hello World!";
  }

  @UseGuards(JwtGuard)
  @Get("/appointments/latest")
  async _fetchLatestAppointment(@Request() request: any): Promise<Partial<IAppointment>[]> {
    const user = request.user;

    const appointments = await this.fetchLatestAppointment.execute(user.branchId);
    return appointments.map((appointment) => AppointmentMapper.toDTO(appointment));
  }

  @UseGuards(JwtGuard)
  @Put("/appointments/:id")
  async _updateAppointment(@Param() params: any, @Body() body: any): Promise<void> {
    const { id } = params;
    await this.updateAppointment.execute(id, body);
  }
}
