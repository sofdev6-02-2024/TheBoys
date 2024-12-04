import {
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateTrainingPlanDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availableTimes?: string[];

  @IsOptional()
  @IsString()
  presentationVideo?: string;

  @IsOptional()
  @IsNumber()
  sessionDuration?: number;

  @IsOptional()
  @IsNumber()
  totalDuration?: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prerequisites?: string[];

  @IsUUID()
  userId: string;
}
