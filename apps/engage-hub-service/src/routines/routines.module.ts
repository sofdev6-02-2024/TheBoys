import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, Exercise])],
  controllers: [RoutinesController],
  providers: [RoutinesService],
})
export class RoutinesModule {}
