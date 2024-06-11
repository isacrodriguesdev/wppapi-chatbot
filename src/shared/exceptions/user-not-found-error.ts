import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundError extends HttpException {
  constructor() {
    super("UserNotFound", HttpStatus.NOT_FOUND);
  }
}
