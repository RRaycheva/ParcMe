import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { Favourites } from '../favourites/favourites.entity';
import { Garage } from '../garage/garage.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @InjectRepository(Favourites)
  private readonly favouritesRepository: Repository<Favourites>;
  @InjectRepository(Garage)
  private readonly garageRepository: Repository<Garage>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }

  public async addToFavourites(userId: number, garageId: number) {
    const user = await this.repository.findOne({ where: { id: userId } });
    const garage = await this.garageRepository.findOne({
      where: { id: garageId },
    });
    if (!user || !garage) {
      throw new NotFoundException(
        'Can not add to favourites a garage that does not exists',
      );
    }

    return this.favouritesRepository.save({ userId, garageId });
  }

  public async getFavourites(userId: number) {
    const res = await this.favouritesRepository.find({
      where: { userId },
      relations: ['garage'],
    });
    return res;
  }

  public async getUserById(id: number) {
    return await this.repository.find({ where: { id } });
  }
}
