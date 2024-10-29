import { IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateUsersInformationDto {

  @IsInt()
  @IsOptional()
  user_id: number;

  @IsInt()
  @IsOptional()
  height: number;

  @IsDecimal()
  @IsOptional()
  weight: number;

  @IsInt()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  gender: string;

  @IsDecimal()
  @IsOptional()
  body_fat_porcentage: number;

  @IsString()
  @IsOptional()
  activity_level: string;

  @IsString()
  @IsOptional()
  goal: string; 
}
