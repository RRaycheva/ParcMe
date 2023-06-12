import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { Garage } from '../garage/garage.entity';
import { Favourites } from '../favourites/favourites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Garage, Favourites]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
