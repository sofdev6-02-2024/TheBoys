import { UUID } from 'crypto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateRoutineDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  creatorId: UUID;

  @IsNotEmpty()
  @IsEnum(['easy', 'medium', 'hard'])
  difficultLevel: 'easy' | 'medium' | 'hard';

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  exercises: string[];

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
