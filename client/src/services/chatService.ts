import { PARCK_ME_SERVER } from '@env';
import { isEmpty } from 'lodash';
import { Falsy } from 'react-native';
import { Socket, io } from 'socket.io-client';
import { getData } from '../helpers/helpers';
import { Service } from './baseService';
import { UserDto } from './userService';

export interface ChatListDto {
  id: number | string;
  content: string;
  created_at: string;
  receiver: UserDto;
}

export interface ChatMessageItem {
  id: string | number;
  senderId: string | number;
  receiverId: string | number;
  content: string;
  createdAt: string;
}

export interface ChatDto {
  receiver: UserDto;
  messages: ChatMessageItem[];
}

export interface SendMessageDto {
  receiverId: string | number;
  content: string;
}

type TonMessageReceive = (msg: ChatMessageItem) => void;

class ChatService extends Service {
  private socket: Socket | null | undefined;

  async connectSocket(onMessageReceive?: TonMessageReceive) {
    const savedToken: string | Falsy = await getData(this.USER_TOKEN_KEY);

    if (isEmpty(savedToken)) {
      throw new Error('No saved taken');
    }

    this.socket = io(PARCK_ME_SERVER, {
      extraHeaders: { Authorization: `Bearer ${savedToken}` },
    });
    this.socket.on('connect', () => console.log('connected', this.socket?.id));
    this.socket.on('disconnect', () => console.log('disconnected'));
    this.socket.on(
      'receiveMessage',
      (msg: ChatMessageItem) => onMessageReceive && onMessageReceive(msg),
    );
    this.socket.on('sendMessage', (msg: ChatMessageItem) => {
      console.log('send message', msg);
      onMessageReceive && onMessageReceive(msg);
    });
  }

  async disconnectSocket() {
    if (isEmpty(this.socket)) {
      throw new Error('Socket not initialized');
    }
    await this.socket.disconnect();
  }

  async sendMessage(payload: SendMessageDto) {
    if (isEmpty(this.socket)) {
      throw new Error('Socket not initialized');
    }
    return (await this.socket.emitWithAck(
      'sendMessage',
      payload,
    )) as ChatMessageItem;
  }

  async getMessageList() {
    const response = (await this.handleRequest(
      `${this.defaultEndpoint}/chat/list`,
      'GET',
    )) as ChatListDto[];
    return response;
  }

  async getMessagesForUser(
    receiverId: string | number,
    offset = 0,
    limit = 20,
  ) {
    const response = (await this.handleRequest(
      `${this.defaultEndpoint}/chat/${receiverId}?offset=${offset}&limit=${limit}`,
      'GET',
    )) as ChatDto;
    return response;
  }
}

export default new ChatService();
