import { IsString, IsNotEmpty, IsDate, IsOptional, IsEnum, MinLength, Matches, IsUUID } from 'class-validator';
import { VisibilityTypes } from '../entities/visibility_type.entity';
import { UUID } from 'crypto';

export class CreateEventDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'userId must be a valid UUID.' })
  userId: UUID;
  
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Description must be at least 3 characters long.' })
  description: string;

  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @IsNotEmpty()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Start time must be in the format HH:mm:ss' })
  startTime: string;

  @IsNotEmpty()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Start time must be in the format HH:mm:ss' })
  endTime: string;

  @IsNotEmpty()
  @IsEnum(VisibilityTypes.getAllVisibilitys(), {
    message: `The visibility must be one of: ${VisibilityTypes.getAllVisibilitys().join(', ')}`,
  })
  visibility: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  meetingLink?: string;
}
