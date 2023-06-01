import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  public picture: string[];

  @Column({ type: 'timestamp', nullable: true, default: null })
  public dateOfPost: Date | null;
}
