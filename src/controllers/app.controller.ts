import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { FetchAnalyticalData } from "src/app/usecases/fetch-analytical-data/fetch-analytical-data";
import { FetchTicket } from "src/app/usecases/fetch-ticket/fetch-ticket";
import { UpdateEmployee } from "src/app/usecases/update-employee/update-employee";
import { Ticket } from "src/domain/entities/ticket";
import { JwtGuard } from "src/shared/infra/auth/passport-jwt/jwt.guard";

@Controller()
export class AppController {
  constructor(
    private readonly fetchAnalyticalData: FetchAnalyticalData,
    private readonly updateEmployee: UpdateEmployee,
    private readonly fetchTicket: FetchTicket,
  ) {}

  @Get()
  async getHello() {
    return "Hello World!";
  }

  @UseGuards(JwtGuard)
  @Get("analytical-data")
  async _fetchAnalyticalData(@Request() request: any) {
    const user = request.user;
    return this.fetchAnalyticalData.execute(user.companyId, user.branchId);
  }

  @UseGuards(JwtGuard)
  @Put("employees")
  async _updateEmployee(@Body() body: any) {
    await this.updateEmployee.execute(body.id, body);
  }

  @UseGuards(JwtGuard)
  @Get("tickets")
  async _fetchTicket(@Request() request: any) {
    const user = request.user;
    return this.fetchTicket.execute(user.branchId);
  }
}
