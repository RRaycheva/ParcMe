import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Post,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() req) {
    return this.service.getUser(req.user.id);
  }

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(
    @Body() body: UpdateNameDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateName(body, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile_picture')
  @UseInterceptors(
    FileInterceptor('file', {
      // Storage properties
      storage: diskStorage({
        // Destination storage path details
        destination: async (
          req: Request,
          _file: Express.Multer.File,
          callback: (error: Error | null, destination: string) => void,
        ) => {
          const uploadPath = `uploads/user`;
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            await fs.mkdir(uploadPath);
          }
          callback(null, uploadPath);
        },
        filename: async (
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          if (!req.user) callback(new Error('No user found'), '');

          callback(null, `${(req.user as any)?.id as string}`);
        },
      }),
    }),
  )
  uploadProfileP(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user?.id;
    return this.service.saveProfilePicture(userId);
  }

  @Get('profile/:id')
  getGaragePicture(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const image = this.service.readProfilePicture(id);
    if (image) {
      res.set({ 'Content-Type': 'image/png image/jpg image/jpeg' });
      return image;
    }
    res.sendStatus(404);
  }

  @Get('profile/default')
  getDefaultProfilePicture(@Res({ passthrough: true }) res: Response) {
    const image = this.service.readDefaultProfilePicture();
    if (image) {
      res.set({ 'Content-Type': 'image/png' });
      return image;
    }
    res.sendStatus(404);
  }

  @Get('favourite/:id')
  @UseGuards(JwtAuthGuard)
  private addToFavourites(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user?.id;
    const garageId = id;
    return this.service.addToFavourites(userId, garageId);
  }

  @Delete('favourite/:id')
  @UseGuards(JwtAuthGuard)
  private removeFromFavourites(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user?.id;
    const garageId = id;
    return this.service.removeFromFavourites(userId, garageId);
  }

  @Get('favourites')
  @UseGuards(JwtAuthGuard)
  private getFavourites(@Req() req) {
    const userId = req.user?.id;
    return this.service.getFavourites(userId);
  }
}
