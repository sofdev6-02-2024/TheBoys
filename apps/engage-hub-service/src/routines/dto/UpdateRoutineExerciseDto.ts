import {
    IsOptional,
    IsNotEmpty,
    IsUUID,
    IsEnum,
  } from 'class-validator';
import { UUID } from 'crypto';
  
  export class UpdateRoutineExerciseDto {
    @IsUUID()
    id: UUID;
  
    @IsOptional()
    @IsNotEmpty()
    repetitions: number;
  
    @IsOptional()
    @IsNotEmpty()
    time: number;
  
    @IsOptional()
    @IsEnum(['not started', 'in progress', 'completed'])
    status: 'not started' | 'in progress' | 'completed';
  }
  
  