import { Trim } from 'class-sanitizer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class GarageDto {
  @Trim()
  @IsString()
  public readonly name: string;

  @IsNumber()
  public readonly latitude: number;
  @IsNumber()
  public readonly longitude: number;

  @IsString()
  public readonly addressName?: string;

  public readonly pricePerHour: number;

  @IsArray()
  public readonly picture: string[];

  @IsString()
  public readonly dateOfPost?: Date;
}
