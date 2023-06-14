import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { ChatDto } from './chat.dto';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { AuthService } from '../user/auth/auth.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  @InjectRepository(Chat)
  private chatRepository: Repository<Chat>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthService)
  private readonly authService: AuthService;

  async getUserById(userId: number) {
    return await this.userRepository.findOneOrFail({ where: { id: userId } });
  }

  async getUserFromSocket(socket: Socket) {
    try {
      let auth_token = socket.handshake?.headers?.authorization;

      if (!auth_token) throw new WsException('Invalid credentials.');
      // get the token itself without "Bearer"
      auth_token = auth_token.split(' ')[1];
      const user = this.authService.getUserFromToken(auth_token);

      if (!user) {
        throw new WsException('Invalid credentials.');
      }
      return user;
    } catch (error) {
      console.error(error);
      //   throw new WsException('Invalid credentials.');
    }
  }

  async createMessage(userId: number, payload: ChatDto): Promise<Chat> {
    return await this.chatRepository.save({ senderId: userId, ...payload });
  }

  async getMessageList(userId: number) {
    // const res = await this.chatRepository
    //   .query(`SELECT chat.id, chat.content, chat.created_at, to_json(receiver) as receiver
    //             FROM  (
    //             SELECT DISTINCT ON ("receiverId", "senderId") *
    //             FROM chat
    //             WHERE "senderId" = ${userId} OR "receiverId" = ${userId}
    //                 ORDER  BY "receiverId", "senderId", created_at DESC
    //             ) chat
    // 	   		LEFT JOIN public.user as receiver ON receiver.id = "receiverId"
    //     ORDER  BY created_at DESC;
    // `);
    // return res;

    const res = await this.chatRepository
      .query(`WITH u1 AS (SELECT id FROM public.user WHERE id = ${userId})
      SELECT DISTINCT ON (userId) chat_id as id, content, created_at, TO_JSON(RECEIVER) AS RECEIVER
      FROM  (
         SELECT u.id AS userId, u.name AS userName, c.content, c.created_at, c.id as chat_id  -- received
         FROM   u1
         JOIN   chat c ON c."senderId" = u1.id
         JOIN   public.user u ON u.id = c."receiverId"
      
         UNION  ALL
         SELECT u.id, u.name, c.content, c.created_at, c.id as chat_id -- sent
         FROM   u1
         JOIN   chat c ON c."receiverId" = u1.id
         JOIN   public.user u ON u.id = c."senderId"
         ) sub
      LEFT JOIN PUBLIC.USER AS RECEIVER ON RECEIVER.ID = userId
      ORDER  BY userId, created_at DESC;
    `);
    return res;
  }

  async getMessages(
    userId: number,
    receiverId: number,
    limit = 10,
    offset = 0,
  ) {
    const messages = await this.chatRepository.find({
      where: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    const receiver = await this.userRepository.findOne({
      where: { id: receiverId },
    });
    return {
      receiver,
      messages,
    };
  }
}
