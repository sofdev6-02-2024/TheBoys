import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { SpecializationTypes } from 'src/trainer-request/entities/especialization-types.entity';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(SpecializationTypes.getAllSpecializations(), {
    message: `specialization must be one of: ${SpecializationTypes.getAllSpecializations().join(', ')}`,
  })
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  trainerId: string;

  @IsOptional() 
  @IsString({ each: true })
  users: string[] = []; 
}
