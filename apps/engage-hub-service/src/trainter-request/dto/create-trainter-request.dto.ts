import { UUID } from 'crypto';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CertificationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  issuedBy: string;

  @IsNotEmpty()
  @IsDate()
  issueDate: Date;
}

export class CreateTrainerRequestDto {
  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsArray()
  certifications: CertificationDto[];

  @IsNotEmpty()
  @IsString()
  availability: string;

  @IsNotEmpty()
  @IsEnum(['Weightlifting', 'Resistance Training', 'Cardio'])
  specialization: 'Weightlifting' | 'Resistance Training' | 'Cardio';

  @IsOptional()
  @IsUUID()
  userId: UUID;
}
