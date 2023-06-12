import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourites } from './favourites.entity';

@Injectable()
export class FavouritesService {
  @InjectRepository(Favourites)
  private readonly repository: Repository<Favourites>;
}
