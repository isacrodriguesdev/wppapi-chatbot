import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountAlreadyRegisteredError extends HttpException {
  constructor() {
    super("AccountAlreadyRegistered", HttpStatus.BAD_REQUEST);
  }
}
