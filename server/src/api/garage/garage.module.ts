import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarageController } from './garage.controller';
import { GarageService } from './garage.service';
import { Garage } from './garage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Garage])],
  controllers: [GarageController],
  providers: [GarageService],
})
export class GarageModule {}
