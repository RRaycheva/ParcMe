import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Garage extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'float' })
  public latitude: number;

  @Column({ type: 'float' })
  public longitude: number;

  @Column({ type: 'varchar' })
  public addressName: string;

  @Column({ type: 'decimal' })
  public pricePerHour: number;

  @Column({ type: 'varchar', array: true, default: [] })
  public pictures: string[];

  @Column({ type: 'timestamp', nullable: true, default: null })
  public dateOfPost: Date | null;

  @Column({ default: '' })
  public description: string;

  @Column({ default: false })
  public approved: boolean;

  @ManyToOne(() => User, (user) => user.garages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
