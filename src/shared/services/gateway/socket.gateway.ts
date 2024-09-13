import { Server, Socket } from "socket.io";
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private topics: { [key: string]: string[] } = {};

  //constructor(private readonly newMessageHandler: NewMessageHandler) {}

  handleConnection(socket: Socket, ...args: any[]) {
    console.log("Client connected:", socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log("Client disconnected:", socket.id);
    for (const topic in this.topics) {
      if (this.topics[topic].includes(socket.id)) {
        this.topics[topic] = this.topics[topic].filter((id) => id !== socket.id);
        socket.leave(topic);
      }
    }
  }

  @SubscribeMessage("joinRoom")
  onJoinRoom(socket: Socket, topic: string): void {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    if (!this.topics[topic].includes(socket.id)) {
      this.topics[topic].push(socket.id);
      socket.join(topic);
    }

    console.log(`Client ${socket.id} joined topic ${topic}`);
  }

  @SubscribeMessage("newMessage")
  async onNewMessage(socket: Socket, data: any): Promise<void> {
    const message = JSON.parse(data);

    try {
      //await this.newMessageHandler.handle(message);
      socket.to(message.topic).emit("newMessage", message);
    } catch (error) {}
  }

  // send message to whatsapp
  emit(event: string, message: { topic: string; payload: any }): void {
    this.server.to(message.topic).emit(event, message);
  }
}
