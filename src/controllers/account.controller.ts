import { Controller, Post, Body } from "@nestjs/common";
import { LoginAccount } from "@/app/usecases/LoginAccount";

@Controller("/api/v1/account")
export class AccountController {
  constructor(private readonly loginAccount: LoginAccount) {}

  @Post("/login")
  async _login(@Body() body: any): Promise<any> {
    const { email, password } = body;
    const response = await this.loginAccount.execute(email, password);
    return response;
  }
}
