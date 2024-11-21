import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { CertificationDto } from './certification.dto';
import { SpecializationTypes } from '../entities/especialization-types.entity';
import { StatusTypes } from '../entities/status-types.entity';

export class UpdateTrainerRequestDto {
  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsArray()
  certifications?: CertificationDto[];

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
