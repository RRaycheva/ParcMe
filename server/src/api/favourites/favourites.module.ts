import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourites } from './favourites.entity';
import { FavouritesControler } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favourites])],
  controllers: [FavouritesControler],
  providers: [FavouritesService],
})
export class GarageModule {}
