import GetUserByPhone from "@/app/usecases/GetUserByPhone";
import SaveUser from "@/app/usecases/SaveUser";
import { JwtGuard } from "@/shared/infra/auth/passport-jwt/jwt.guard";
import { Controller, Get, Post, Param, Body, UseGuards, Request } from "@nestjs/common";

@Controller("/api/v1/user")
export class UserController {
  constructor(
    private readonly saveUser: SaveUser,
    private readonly getUserByPhone: GetUserByPhone,
  ) {}

  @UseGuards(JwtGuard)
  @Get("/phone/:phone")
  async getByPhone(@Request() request: any, @Param("phone") phone: string): Promise<any> {
    const { branchId } = request.user;
    return await this.getUserByPhone.execute(phone, branchId);
  }

  @UseGuards(JwtGuard)
  @Get("/:id")
  async getById(@Param("id") id: string): Promise<any> {
    return { id };
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: any): Promise<any> {
    return await this.saveUser.execute(body);
  }
}
