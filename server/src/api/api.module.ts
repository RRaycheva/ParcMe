import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GarageModule } from './garage/garage.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, GarageModule, ChatModule],
})
export class ApiModule {}
