import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarageController } from './garage.controller';
import { GargeService } from './garage.service';
import { Garage } from './garage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Garage])],
  controllers: [GarageController],
  providers: [GargeService],
})
export class GarageModule {}
