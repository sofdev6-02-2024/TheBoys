import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserInformationDto {
  @IsInt()
  @IsOptional()
  height?: number;

  @IsNumber({
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  weight?: number;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsNumber({
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  body_fat_porcentage?: number;

  @IsString()
  @IsOptional()
  activity_level?: string;

  @IsString()
  @IsOptional()
  goal?: string;
}
