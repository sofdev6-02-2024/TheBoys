import { UUID } from 'crypto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRoutineDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsUUID()
  creatorId: UUID;

  @IsNotEmpty()
  @IsEnum(['easy', 'medium', 'hard'])
  difficultLevel: 'easy' | 'medium' | 'hard';

  @IsNotEmpty()
  @IsArray()
  @IsUUID(4, { each: true })
  exercises: UUID[];
}
