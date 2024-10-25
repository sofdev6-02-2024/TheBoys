import { Controller } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @MessagePattern({ cmd: 'getExercises' })
  getExercises(): Promise<any> {
    return this.exerciseService.getExercises();
  }

  @MessagePattern({ cmd: 'filterExercisesByName' })
  async filterExercisesByName({ name }: { name: string }): Promise<any> {
    const exercises = await this.exerciseService.getExercises();

    // Filtra según la estructura de datos correcta
    const filteredExercises = Array.isArray(exercises)
      ? exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(name.toLowerCase())
        )
      : []; // Asegura que sea un array para filtrar correctamente

    return filteredExercises;
  }
}
