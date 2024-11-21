import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CertificationDto } from './certification.dto';
import { UUID } from 'crypto';
import { SpecializationTypes } from '../entities/especialization-types.entity';

export class CreateTrainerRequestDto {
  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsArray()
  certifications: CertificationDto[];

  @IsNotEmpty()
  @IsString()
  availability: string;

  @IsNotEmpty()
  @IsEnum(SpecializationTypes.getAllSpecializations(), {
    message: `specialization must be one of: ${SpecializationTypes.getAllSpecializations().join(', ')}`,
  })
  specialization: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsUUID()
  userId: UUID;
}