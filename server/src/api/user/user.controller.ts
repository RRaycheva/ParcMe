import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('name')
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(
    @Body() body: UpdateNameDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateName(body, req);
  }

  @Get('favourite/:id')
  private addToFavourites(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user?.id;
    const garageId = id;
    return this.service.addToFavourites(userId, garageId);
  }

  @Get('favourites')
  private getFavourites(@Req() req) {
    const userId = req.user?.id;
    return this.service.getFavourites(userId);
  }
}
