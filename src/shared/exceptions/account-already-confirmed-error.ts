import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountAlreadyConfirmedError extends HttpException {
  constructor() {
    super("AccountAlreadyConfirmed", HttpStatus.BAD_REQUEST);
  }
}
