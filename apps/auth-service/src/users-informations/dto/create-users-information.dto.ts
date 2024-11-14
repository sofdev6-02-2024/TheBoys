import { IsDecimal, IsInt, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserInformationDto {
  @IsString()
  userId: string;

  @IsInt()
  height: number;

  @IsNumber({
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  weight: number;

  @IsInt()
  age: number;

  @IsString()
  gender: string;

  @IsNumber({
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  body_fat_porcentage: number;

  @IsString()
  activity_level: string;

  @IsString()
  goal: string;
}
