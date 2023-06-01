import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GarageModule } from './garage/garage.module';

@Module({
  imports: [UserModule, GarageModule],
})
export class ApiModule {}
