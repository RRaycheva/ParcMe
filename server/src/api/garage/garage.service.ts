import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Garage } from './garage.entity';
import { GarageDto } from './garage.dto';

@Injectable()
export class GargeService {
  @InjectRepository(Garage)
  private readonly repository: Repository<Garage>;

  create(body: GarageDto): Promise<Garage> {
    console.log('body2', body);
    const garage: GarageDto = { ...body, dateOfPost: new Date() };

    return this.repository.save(garage);
  }

  public getAll() {
    return this.repository.find();
  }
}
