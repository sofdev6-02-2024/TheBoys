import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingPlanService } from './training-plan.service';
import { TrainingPlanController } from './training-plan.controller';
import { TrainingPlan } from './entities/training-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingPlan])],
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService],
})
export class TrainingPlanModule {}
