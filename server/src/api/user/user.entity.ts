import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Garage } from '../garage/garage.entity';
import { Favourites } from '../favourites/favourites.entity';
import { Chat } from '../chat/chat.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @Column({ type: 'boolean', default: false })
  public isAdmin: boolean;

  @OneToMany(() => Garage, (garage) => garage.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  garages: Garage[];

  @ManyToMany(
    () => Garage,
    (Garage) => Garage.user, //optional
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinTable({
    name: 'favourites',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'garage_id',
      referencedColumnName: 'id',
    },
  })
  favourites?: Garage[];

  @OneToMany(() => Chat, (chat) => chat.receiver)
  chats: Chat[];
}
