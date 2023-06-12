import { Controller, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { FavouritesService } from './favourites.service';

@Controller('garage')
@UseGuards(JwtAuthGuard)
export class FavouritesControler {
  @Inject(FavouritesService)
  private readonly service: FavouritesService;
}
