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
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

// @UseGuards(JwtAuthGuard)
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
  async handleSendMessage(client: Socket, payload: ChatDto): Promise<void> {
    const user = await this.chatService.getUserFromSocket(client);
    if (!user) client.disconnect();
    await this.chatService.createMessage(user.id, payload);
    client.emit('receiveMessage', payload);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.chatService.getUserFromSocket(client);
    console.log(`connect: ${client.id}`);
    if (!user) client.disconnect();
  }
}
