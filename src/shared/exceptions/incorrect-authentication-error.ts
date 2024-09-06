import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectAuthenticationError extends HttpException {
  constructor() {
    super("IncorrectAuthentication", HttpStatus.UNAUTHORIZED);
  }
}
