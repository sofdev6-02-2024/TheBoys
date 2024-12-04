import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingPlan } from './entities/training-plan.entity';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';

@Injectable()
export class TrainingPlanService {
  constructor(
    @InjectRepository(TrainingPlan)
    private trainingPlanRepository: Repository<TrainingPlan>,
  ) {}

  async create(data: CreateTrainingPlanDto): Promise<TrainingPlan> {
    const newPlan = this.trainingPlanRepository.create(data);
    return this.trainingPlanRepository.save(newPlan);
  }

  async findByCoach(userId: string): Promise<TrainingPlan[]> {
    return this.trainingPlanRepository.find({ where: { userId } });
  }

  async update(
    planId: string,
    userId: string,
    data: UpdateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    const plan = await this.trainingPlanRepository.findOne({
      where: { id: planId, userId },
    });
    if (!plan) {
      throw new NotFoundException(
        'Training plan not found or you are not authorized to modify it',
      );
    }
    Object.assign(plan, data);
    return this.trainingPlanRepository.save(plan);
  }

  async delete(planId: string, userId: string): Promise<void> {
    const plan = await this.trainingPlanRepository.findOne({
      where: { id: planId, userId },
    });
    if (!plan) {
      throw new NotFoundException(
        'Training plan not found or you are not authorized to delete it',
      );
    }
    await this.trainingPlanRepository.remove(plan);
  }
}
