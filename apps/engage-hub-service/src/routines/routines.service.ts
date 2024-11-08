import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { ExerciseService } from 'src/ExerciseService/exercise.service';
import { RoutineExercise } from 'src/routines_exercises/entities/routine-exercise.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routinesRepository: Repository<Routine>,
    @InjectRepository(RoutineExercise)
    private readonly routineExerciseRepository: Repository<RoutineExercise>,
    private readonly exerciseService: ExerciseService,
  ) {}

  async getValidExerciseList(exercises: string[]) {
    const exercisesList = [];
    for (const exerciseId of exercises) {
      const exercise = await this.exerciseService.getExercisesById(exerciseId);
      if (exercise) exercisesList.push(exercise);
    }
    return exercisesList;
  }

  async create(createRoutineDto: CreateRoutineDto) {
    const { exercises, ...routineData } = createRoutineDto;

    const exercisesList = await this.getValidExerciseList(exercises);

    if (exercisesList.length === 0)
      throw new NotFoundException('Exercises Not Found');

    const newRoutine = this.routinesRepository.create({
      ...routineData,
    });

    await this.routinesRepository.save(newRoutine);

    for (const exercise of exercisesList) {
      const routineExercise = this.routineExerciseRepository.create({
        routineId: newRoutine.id,
        exerciseId: exercise.id,
      });
      await this.routineExerciseRepository.save(routineExercise);
    }

    return newRoutine;
  }

  findAll() {
    return this.routinesRepository.find();
  }

  findOne(id: UUID) {
    return this.routinesRepository.findOne({ where: { id } });
  }

  async update(id: UUID, updateRoutineDto: UpdateRoutineDto) {
    return this.routinesRepository.update(id, updateRoutineDto);
  }

  remove(id: UUID) {
    this.routinesRepository.delete({ id });
    return { id };
  }

  findOneByUserId(id: UUID) {
    const user = this.routinesRepository.findBy({
      userRutine: { userId: id },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }
}
