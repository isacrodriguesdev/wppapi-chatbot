import { Injectable } from "@nestjs/common";

@Injectable()
export class NewMessageHandler {
  constructor() {}

  async handle({ room, message }: any) {
    console.log("message", { room, message });
  }
}
