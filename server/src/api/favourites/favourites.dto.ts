import { Trim } from 'class-sanitizer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../user/user.entity';
import { LoginDto } from '../user/auth/auth.dto';

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

  @IsNumber()
  public readonly pricePerHour: number;

  @IsArray()
  @IsOptional()
  public readonly pictures: string[];

  @IsString()
  @IsOptional()
  public readonly dateOfPost?: Date;

  public readonly user: LoginDto;
}
