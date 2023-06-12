import { Injectable, StreamableFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Garage } from './garage.entity';
import { GarageDto } from './garage.dto';
import { createReadStream, existsSync } from 'fs';
import { rm } from 'fs/promises';
import { User } from '../user/user.entity';
import { LoginDto } from '../user/auth/auth.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');

@Injectable()
export class GarageService {
  @InjectRepository(Garage)
  private readonly repository: Repository<Garage>;

  create(body: GarageDto, user: User): Promise<Garage> {
    const garage: GarageDto = {
      ...body,
      dateOfPost: new Date(),
      user,
    };

    return this.repository.save(garage);
  }

  public getAll() {
    return this.repository.find();
  }

  public getUserGarages(user: User) {
    return this.repository.find({ where: { user: { id: user.id } } });
  }

  public async deleteAll() {
    const imageLocation = path.join(process.cwd(), 'uploads/garage');
    // Remove old files
    for (const file of await fs.readdir(imageLocation)) {
      await rm(path.join(imageLocation, file), { recursive: true });
    }
    //
    return this.repository.delete({});
  }

  public async uploadImages(id: number, files: Array<Express.Multer.File>) {
    try {
      const currentImages = (await this.repository.findOne({ where: { id } }))
        .pictures;
      // Remove old files
      currentImages.forEach(
        async (image) => await fs.unlink(path.join('uploads', image)),
      );
    } catch (error) {
      console.info(error);
    }
    return await this.repository.update(id, {
      pictures: files.map((f) => `/garage/${id}/${f.filename}`),
    });
  }

  public readImages(id: number, picture_id: string) {
    try {
      const imageLocation = path.join(
        process.cwd(),
        'uploads/garage',
        id.toString(),
        picture_id,
      );
      if (!existsSync(imageLocation)) return false;
      const file = createReadStream(imageLocation);
      return new StreamableFile(file);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
