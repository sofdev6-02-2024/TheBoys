import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { SpecializationTypes } from 'src/trainer-request/entities/especialization-types.entity';

export class CreateMessageHistoryDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userId: string; 

  @IsString()
  @IsNotEmpty()
  communityId: string; 

  @IsString()
  @IsNotEmpty()
  message: string; 

}
