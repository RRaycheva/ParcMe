import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from '../user.entity';
import { BaseEntity } from 'typeorm';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export interface AuthResponseDto {
  user: User;
  token: string;
}
