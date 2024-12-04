import { IsEnum, IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';
import { SpecializationTypes } from 'src/trainer-request/entities/especialization-types.entity';

export class UpdateMessageHistoryDto {
  @IsString()
  @IsOptional()
  message?: string;


}
