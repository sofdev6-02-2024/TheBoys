import {
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateTrainingPlanDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  specialization: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  availableTimes: string[];

  @IsOptional()
  @IsString()
  presentationVideo?: string;

  @IsNumber()
  sessionDuration: number;

  @IsNumber()
  totalDuration: number;

  @IsNumber()
  cost: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  prerequisites?: string[];

  @IsUUID()
  userId: string;
}
