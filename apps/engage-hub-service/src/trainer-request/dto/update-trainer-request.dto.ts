import { SpecializationTypes } from '../entities/especialization-types.entity';
import { StatusTypes } from '../entities/status-types.entity';
import { UpdateCertificationDto } from './upate-certification.dto';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTrainerRequestDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsArray()
  certifications?: UpdateCertificationDto[];

  @IsOptional()
  @IsString()
  availability?: string;

  @IsOptional()
  @IsEnum(SpecializationTypes.getAllSpecializations(), {
    message: `specialization must be one of: ${SpecializationTypes.getAllSpecializations().join(', ')}`,
  })
  specialization?: string;

  @IsOptional()
  @IsEnum(StatusTypes.getAllStatuses(), {
    message: `status must be one of: ${StatusTypes.getAllStatuses().join(', ')}`,
  })
  status?: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
