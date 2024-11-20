import { UUID } from 'crypto';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CertificationDto } from './create-trainter-request.dto';

export class UpdateTrainerRequestDto {
  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsArray()
  certifications: CertificationDto[];

  @IsOptional()
  @IsString()
  availability: string;

  @IsOptional()
  @IsEnum(['Weightlifting', 'Resistance Training', 'Cardio'])
  specialization: 'Weightlifting' | 'Resistance Training' | 'Cardio';

  @IsOptional()
  @IsEnum(['Pending', 'Accepted', 'Rejected', 'Discontinued'])
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Discontinued';

  @IsOptional()
  @IsString()
  comments: string;

  @IsOptional()
  @IsUUID()
  userId: UUID;
}
