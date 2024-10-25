import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateUsersInformationDto {

  @IsInt()
  user_id: number;

  @IsInt()
  height: number;

  @IsDecimal()
  weight: number;

  @IsInt()
  age: number;

  @IsString()
  gender: string;

  @IsDecimal()
  body_fat_porcentage: number;

  @IsString()
  activity_level: string;

  @IsString()
  goal: string; 
}
