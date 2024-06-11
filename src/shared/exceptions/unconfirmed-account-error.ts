import { HttpException, HttpStatus } from "@nestjs/common";

export class UnconfirmedAccountError extends HttpException {
  constructor() {
    super("UnconfirmedAccount", HttpStatus.FORBIDDEN);
  }
}
