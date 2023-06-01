import { Body, Controller, Get, Post } from '@nestjs/common';
import { GarageDto } from './garage.dto';
import { Garage } from './garage.entity';
import { GargeService } from './garage.service';

@Controller('garage')
export class GarageController {
  //   @Inject(GargeService)
  constructor(private readonly service: GargeService) {}
  @Post()
  create(@Body() body: GarageDto): Promise<Garage | never> {
    console.log(body);
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }
}
