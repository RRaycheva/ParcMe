import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { ChatGateway } from './chat.gateway';
import { AuthHelper } from '../user/auth/auth.helper';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../user/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])],
  controllers: [ChatController],
  providers: [AuthService, ChatService, ChatGateway, AuthHelper, JwtService],
})
export class ChatModule {}
