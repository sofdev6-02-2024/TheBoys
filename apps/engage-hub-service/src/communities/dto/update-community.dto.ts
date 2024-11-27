import { IsEnum, IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';
import { SpecializationTypes } from 'src/trainer-request/entities/especialization-types.entity';

export class UpdateCommunityDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(SpecializationTypes.getAllSpecializations(), {
    message: `specialization must be one of: ${SpecializationTypes.getAllSpecializations().join(', ')}`,
  })
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  cost: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  trainerId: string;
}
