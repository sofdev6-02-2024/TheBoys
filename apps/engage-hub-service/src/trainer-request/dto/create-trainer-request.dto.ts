import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import { SpecializationTypes } from '../entities/especialization-types.entity';
import { CreateCertificationDto } from './create-certification.dto';

export class CreateTrainerRequestDto {
  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsArray()
  certifications: CreateCertificationDto[];

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
