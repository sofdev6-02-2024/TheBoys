import { IsString, IsNotEmpty, IsDate, IsOptional, IsEnum, MinLength, Matches, IsUUID } from 'class-validator';
import { VisibilityTypes } from '../entities/visibility_type.entity';
import { UUID } from 'crypto';

export class UpdateEventDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'userId must be a valid UUID.' })
  userId: UUID;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Description must be at least 3 characters long.' })
  description?: string;

  @IsOptional()
  @IsDate()
  eventDate?: Date;

  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Start time must be in the format HH:mm:ss' })
  startTime?: string;

  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'Start time must be in the format HH:mm:ss' })
  endTime?: string;

  @IsOptional()
  @IsEnum(VisibilityTypes.getAllVisibilitys(), {
    message: `specialization must be one of: ${VisibilityTypes.getAllVisibilitys().join(', ')}`,
  })
  visibility?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  meetingLink?: string;
}
