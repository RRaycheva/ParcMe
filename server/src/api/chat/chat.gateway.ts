import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import { ChatDto } from './chat.dto';
import { WsException } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: ChatDto) {
    const user = await this.chatService.getUserFromSocket(client);
    if (!user) client.disconnect();

    // Check if receiver exists
    const receiver = await this.chatService.getUserById(payload.receiverId);
    if (!receiver) throw new WsException('Receiver does not exists');

    const message = await this.chatService.createMessage(user.id, payload);

    this.server.to(receiver.email).emit('receiveMessage', message);
    // Pipe response to ACK
    return message;
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.chatService.getUserFromSocket(client);
    if (!user) client.disconnect();
    // Join user specific room
    await client.join(user.email);
    console.log(`joined: ${client.id} ${user.email}`);
    //
  }
}
