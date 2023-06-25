import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GarageDto } from './garage.dto';
import { Garage } from './garage.entity';
import { GarageService } from './garage.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';

import { existsSync } from 'fs';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { User } from '../user/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');

@Controller('garage')
export class GarageController {
  @Inject(GarageService)
  private readonly service: GarageService;

  @Get()
  findAll() {
    return this.service.getApprovedGarages();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteGarage(@Req() req, @Param('id') garageId: number) {
    return this.service.deleteGarage(req.user, garageId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body: GarageDto): Promise<Garage | never> {
    return this.service.create(body, req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/approve')
  approveGarage(@Param('id') garageId: number, @Req() req) {
    return this.service.approveGarage(req.user, garageId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload')
  @UseInterceptors(
    FilesInterceptor('files', 4, {
      // Storage properties
      storage: diskStorage({
        // Destination storage path details
        destination: async (
          req: Request,
          _file: Express.Multer.File,
          callback: (error: Error | null, destination: string) => void,
        ) => {
          const uploadPath = `uploads/garage/${req.params.id}`;
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            await fs.mkdir(uploadPath);
          }
          callback(null, uploadPath);
        },
      }),
    }),
  )
  uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('garage', id, files);
    return this.service.uploadImages(id, files);
  }

  @Get(':id/:picture_id')
  getGaragePicture(
    @Param('id') id: number,
    @Param('picture_id') picture_id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const image = this.service.readImages(id, picture_id);
    if (image) {
      res.set({ 'Content-Type': 'image/png image/jpg image/jpeg' });
      return image;
    }
    res.sendStatus(404);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findMy(@Req() req) {
    return this.service.getUserGarages(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/pending')
  getPendingApproval(@Req() req) {
    return this.service.getPendingApproval(req.user);
  }

  @Get('/search')
  searchGarages(@Query() { query }) {
    return this.service.searchGarages(query);
  }

  //TODO: only for test
  //   @Delete()
  //   async deleteAll() {
  //     await this.service.deleteAll();
  //     return '';
  //   }
}
