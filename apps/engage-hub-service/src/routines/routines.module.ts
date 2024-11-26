import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { ExerciseService } from 'src/ExerciseService/exercise.service';
import { RoutineExercise } from 'src/routines_exercises/entities/routine-exercise.entity';
import { UserRoutine } from 'src/user/entities/user.routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, RoutineExercise,UserRoutine])],
  controllers: [RoutinesController],
  providers: [RoutinesService, ExerciseService],
})
export class RoutinesModule {}
