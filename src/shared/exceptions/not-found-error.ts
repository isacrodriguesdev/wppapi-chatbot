import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundError extends HttpException {
  constructor() {
    super("NotFound", HttpStatus.NOT_FOUND);
  }
}
