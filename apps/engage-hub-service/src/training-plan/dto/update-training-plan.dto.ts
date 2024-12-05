import {
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsUrl,
  Matches,
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
  @Matches(/\.(jpg|jpeg|png|gif)$/i, {
    message: 'Each image URL must end with .jpg, .jpeg, .png, or .gif',
  })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Matches(/^[A-Za-z]+:\d{2}:\d{2}-\d{2}:\d{2}$/, {
    each: true,
    message:
      'Each available time must follow the format "Day:HH:MM-HH:MM", e.g., "Monday:08:00-09:00"',
  })
  availableTimes?: string[];

  @IsOptional()
  @IsString()
  @IsUrl()
  @Matches(/\.(mp4|mov|avi|mkv)$/i, {
    message: 'The video URL must end with .mp4, .mov, .avi, or .mkv',
  })
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

  @IsString()
  userId: string;
}
