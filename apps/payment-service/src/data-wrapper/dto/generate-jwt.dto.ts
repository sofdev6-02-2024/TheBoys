import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { CurrencyTypes } from 'src/stripe/enums/intent-currency.types';

export class GenerateJwtDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  image_url: string;

  @IsNumber()
  @Min(50)
  amount: number;

  @IsEnum(CurrencyTypes)
  currency: CurrencyTypes;

  @IsString()
  @IsNotEmpty()
  client_secret: string;
}
