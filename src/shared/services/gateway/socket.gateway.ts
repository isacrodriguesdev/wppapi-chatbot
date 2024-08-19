import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { NewMessageHandler } from "src/app/hadlers/new-message/new-message-handler";

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private rooms: { [key: string]: string[] } = {};

  constructor(private readonly newMessageHandler: NewMessageHandler) {}

  handleConnection(socket: Socket, ...args: any[]) {
    console.log("Client connected:", socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log("Client disconnected:", socket.id);
    for (const room in this.rooms) {
      if (this.rooms[room].includes(socket.id)) {
        this.rooms[room] = this.rooms[room].filter((id) => id !== socket.id);
        socket.leave(room);
      }
    }
  }

  @SubscribeMessage("joinRoom")
  onJoinRoom(socket: Socket, room: string): void {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }

    if (!this.rooms[room].includes(socket.id)) {
      this.rooms[room].push(socket.id);
      socket.join(room);
    }

    console.log(`Client ${socket.id} joined room ${room}`);
  }

  @SubscribeMessage("newMessage")
  async onNewMessage(socket: Socket, data: any): Promise<void> {
    const message = JSON.parse(data);

    try {
      await this.newMessageHandler.handle(message);
      socket.to(message.room).emit("newMessage", message);
    } catch (error) {}
  }
}
