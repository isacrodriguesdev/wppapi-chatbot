import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { FetchAnalyticalData } from "src/app/usecases/fetch-analytical-data/fetch-analytical-data";
import { UpdateEmployee } from "src/app/usecases/update-employee/update-employee";
import { JwtGuard } from "src/shared/infra/auth/passport-jwt/jwt.guard";

@Controller()
export class AppController {
  constructor(
    private readonly fetchAnalyticalData: FetchAnalyticalData,
    private readonly updateEmployee: UpdateEmployee,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return "Hello World!";
  }

  @UseGuards(JwtGuard)
  @Get("dashboard")
  async _fetchAnalyticalData(@Request() request: any): Promise<any> {
    const user = request.user;
    return this.fetchAnalyticalData.execute(user.companyId, user.branchId);
  }

  @UseGuards(JwtGuard)
  @Put("employees")
  async _updateEmployee(@Body() body: any): Promise<void> {
    await this.updateEmployee.execute(body);
  }
}
