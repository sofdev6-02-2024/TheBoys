import { UUID } from 'crypto';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsUrl,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateRoutineExerciseDto } from './UpdateRoutineExerciseDto';

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
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoutineExerciseDto)
  exercises: UpdateRoutineExerciseDto[];
}
