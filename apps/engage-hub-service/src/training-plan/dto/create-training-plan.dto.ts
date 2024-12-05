import {
  IsArray,
  IsString,
  IsNumber,
  IsOptional,
  ArrayNotEmpty,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateTrainingPlanDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  specialization: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'At least one image is required' })
  @IsString({ each: true })
  @Matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i, {
    each: true,
    message:
      'Each image URL must be a valid URL and end with .jpg, .jpeg, .png, or .gif',
  })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Matches(/^[A-Za-z]+:\d{2}:\d{2}-\d{2}:\d{2}$/, {
    each: true,
    message:
      'Each available time must follow the format "Day:HH:MM-HH:MM", e.g., "Monday:08:00-09:00"',
  })
  availableTimes: string[];

  @IsOptional()
  @IsString()
  @IsUrl()
  @Matches(/\.(mp4|mov|avi|mkv)$/i, {
    message: 'The video URL must end with .mp4, .mov, .avi, or .mkv',
  })
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

  @IsString()
  userId: string;
}
