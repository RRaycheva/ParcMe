import {
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Garage } from './garage.entity';
import { GarageDto } from './garage.dto';
import { createReadStream, existsSync } from 'fs';
import { rm } from 'fs/promises';
import { User } from '../user/user.entity';
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

  public getPendingApproval(user: User) {
    if (!user.isAdmin)
      throw new UnauthorizedException('Only admin can view pending garages');
    return this.repository.find({
      where: { approved: false },
      relations: ['user'],
    });
  }

  public getApprovedGarages() {
    return this.repository.find({
      where: { approved: true },
      relations: ['user'],
    });
  }

  public getAll() {
    return this.repository.find();
  }

  public getUserGarages(user: User) {
    return this.repository.find({ where: { user: { id: user.id } } });
  }

  public async deleteAll() {
    const imageLocation = path.join(process.cwd(), 'uploads/garage');
    for (const file of await fs.readdir(imageLocation)) {
      await rm(path.join(imageLocation, file), { recursive: true });
    }
    return this.repository.delete({});
  }

  public async deleteGarage(user: User, garageId: number) {
    const garage = await this.repository.findOne({
      where: { id: garageId },
      relations: ['user'],
    });
    if (user?.isAdmin || garage.user.id === user?.id) {
      return await this.repository.delete({ id: garageId });
    } else {
      return new UnauthorizedException();
    }
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

  public async approveGarage(user: User, garageId: number) {
    if (!user.isAdmin)
      throw new UnauthorizedException('Only admin can approve');
    if (!(await this.repository.exist({ where: { id: garageId } })))
      throw new NotFoundException('Garage not found');
    return await this.repository.update({ id: garageId }, { approved: true });
  }

  public async searchGarages(query: string) {
    const likeQuery = ILike(`%${query}%`);
    return await this.repository.find({
      where: [
        { user: { name: likeQuery }, approved: true },
        { name: likeQuery, approved: true },
        { addressName: likeQuery, approved: true },
      ],
      relations: ['user'],
    });
  }
}
