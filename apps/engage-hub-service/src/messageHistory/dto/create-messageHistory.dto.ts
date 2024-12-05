import {  IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageHistoryDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userId: string; 

  @IsString()
  @IsNotEmpty()
  communityId: string; 

  @IsString()
  @IsNotEmpty()
  message: string; 

}
