import {  IsOptional,IsString} from 'class-validator';

export class UpdateMessageHistoryDto {
  @IsString()
  @IsOptional()
  message?: string;


}
