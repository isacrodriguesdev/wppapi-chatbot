import { Controller, Post, Body } from "@nestjs/common";
import { LoginAccount } from "src/app/usecases/login-account/login-account";

@Controller("account")
export class AccountController {
  constructor(private readonly loginAccount: LoginAccount) {}

  @Post("/login")
  async _login(@Body() body: any): Promise<any> {
    const { email, password } = body;
    const response = await this.loginAccount.execute(email, password);
    return response;
  }
}
