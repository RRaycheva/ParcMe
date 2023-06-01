import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { User } from '@/api/user/user.entity';
import { RegisterDto, LoginDto, AuthResponseDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(
    @Body() body: RegisterDto,
  ): Promise<AuthResponseDto | never> {
    console.log(body);
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<AuthResponseDto | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<AuthResponseDto | never> {
    return this.service.refresh(<User>user);
  }

  @Get('check')
  private check(@Req() req: Request): Promise<AuthResponseDto | false> {
    return this.service.check(req);
  }
}
