import { Controller } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @MessagePattern('getExercises' )
  getExercises(): Promise<any> {
    return this.exerciseService.getExercises();
  }

  @MessagePattern('getExercisesByName')
  getExercisesByName(@Payload() data: { name: string }): Promise<any> {
    return this.exerciseService.getExercisesByName(data.name);
  }
}
