import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { CurrencyTypes } from '../enums';

export class CreateIntentDto {
  @IsNumber()
  @Min(50)
  amount: number;

  @IsString()
  @IsEnum(CurrencyTypes)
  currency: CurrencyTypes;
}
