import { UUID } from 'crypto';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsArray,
} from 'class-validator';

export class UpdateRoutineDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsUUID()
  creatorId: UUID;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(['easy', 'medium', 'hard'])
  difficultLevel: 'easy' | 'medium' | 'hard';

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsUUID(4, { each: true })
  exercises: UUID[];
}
