import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { In, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routinesRepository: Repository<Routine>,
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  async create(createRoutineDto: CreateRoutineDto) {
    const { exercises, ...routineData } = createRoutineDto;

    const exercisesList = await this.exercisesRepository.findBy({
      id: In(exercises),
    });

    if (exercisesList.length === 0) {
      throw new RpcException({
        statusCode: 404,
        message: 'Exercises Not Found',
      });
    }

    const newRoutine = this.routinesRepository.create({
      ...routineData,
      exercises: exercisesList,
    });
    await this.routinesRepository.save(newRoutine);

    return newRoutine;
  }

  findAll() {
    return this.routinesRepository.find();
  }

  findOne(id: UUID) {
    return this.routinesRepository.findOne({ where: { id } });
  }

  async update(id: UUID, updateRoutineDto: UpdateRoutineDto) {
    const routine = await this.routinesRepository.findOne({
      where: { id },
      relations: ['exercises'],
    });

    if (!routine) {
      throw new RpcException({
        statusCode: 404,
        message: 'Routine Not Found',
      });
    }

    routine.title = updateRoutineDto.title ?? routine.title;
    routine.difficultLevel =
      updateRoutineDto.difficultLevel ?? routine.difficultLevel;
    routine.creatorId = updateRoutineDto.creatorId ?? routine.creatorId;

    if (updateRoutineDto.exercises && updateRoutineDto.exercises.length > 0) {
      const exercises = await this.exercisesRepository.findBy({
        id: In(updateRoutineDto.exercises),
      });
      routine.exercises = exercises;
    }

    return await this.routinesRepository.save(routine);
  }

  remove(id: UUID) {
    this.routinesRepository.delete({ id });
    return { id };
  }
}
