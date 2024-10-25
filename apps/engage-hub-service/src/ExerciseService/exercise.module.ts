import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
