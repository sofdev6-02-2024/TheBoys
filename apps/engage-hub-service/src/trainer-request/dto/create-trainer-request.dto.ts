import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SpecializationTypes } from '../entities/especialization-types.entity';
import { CreateCertificationDto } from './create-certification.dto';

export class CreateTrainerRequestDto {
  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsArray()
  certifications: CreateCertificationDto[];

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
  @IsString()
  userId: string;
}
