import { HttpException, HttpStatus } from "@nestjs/common";

export default class NotFoundError extends HttpException {
  constructor() {
    super("NotFound", HttpStatus.NOT_FOUND);
  }
}
