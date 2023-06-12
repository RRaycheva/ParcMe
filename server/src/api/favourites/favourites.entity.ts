import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Garage } from '../garage/garage.entity';
import { User } from '../user/user.entity';

@Entity()
export class Favourites extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'garage_id' })
  garageId: number;

  @ManyToOne(() => User, (user) => user.garages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User[];

  @ManyToOne(() => Garage, (Garage) => Garage.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'garage_id', referencedColumnName: 'id' }])
  garage: Garage[];
}
