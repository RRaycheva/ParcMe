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
    const res = await this.chatRepository
      .query(`SELECT chat.id, chat.content, chat.created_at, to_json(receiver) as receiver
    FROM  (
       SELECT DISTINCT ON ("receiverId") *
       FROM chat
       WHERE "senderId" = ${userId}
        ORDER  BY "receiverId", created_at DESC
       ) chat
	   		LEFT JOIN public.user as receiver ON receiver.id = "receiverId"
    ORDER  BY created_at DESC;
`);
    return res;

    // const res = await this.chatRepository
    //   .createQueryBuilder('main')
    //   .select('*')
    //   .from((qb) => {
    //     return (
    //       qb
    //         .subQuery()
    //         .where(`chat.senderId = ${userId}`)
    //         .distinctOn(['chat.receiverId'])
    //         .from(Chat, 'chat')
    //         // .loadRelationIdAndMap('asd', 'receiver')
    //         //   .leftJoinAndMapOne('receiver', 'receiver', 'receiver')
    //         .orderBy({
    //           'chat.receiverId': 'ASC',
    //           created_at: 'DESC',
    //         })
    //     );
    //   }, 'chat')
    //   .distinctOn(['chat.id'])
    //   .orderBy({ 'chat.id': 'DESC', 'chat.created_at': 'ASC' });
    // return res.getRawMany();
  }

  async getMessages(
    userId: number,
    receiverId: number,
    limit = 10,
    offset = 0,
  ) {
    const messages = await this.chatRepository.find({
      where: { senderId: userId, receiverId },
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
