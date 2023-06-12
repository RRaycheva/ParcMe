import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  @Inject(ChatService)
  private readonly service: ChatService;

  @Get('list')
  private getMessageList(@Req() req) {
    const userId = req.user?.id as number;
    return this.service.getMessageList(userId);
  }

  @Get(':id')
  private getMessages(
    @Req() req,
    @Param('id', ParseIntPipe) receiverId: number,
    @Query() { limit, offset },
  ) {
    const userId = req.user?.id as number;
    return this.service.getMessages(userId, receiverId, limit, offset);
  }
}
