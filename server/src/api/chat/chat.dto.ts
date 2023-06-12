import { IsNumber, IsString } from 'class-validator';

export class ChatDto {
  @IsNumber()
  receiverId: number;

  @IsString()
  content: string;
}
