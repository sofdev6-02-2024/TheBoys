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

  async findAll(): Promise<TrainingPlan[]> {
    return this.trainingPlanRepository.find({ where: { isDeleted: false } });
  }

  async findById(TrainingPlansID: string): Promise<TrainingPlan> {
    const plan = await this.trainingPlanRepository.findOne({
      where: { TrainingPlansID, isDeleted: false },
    });
    if (!plan) {
      throw new NotFoundException('Training plan not found');
    }
    return plan;
  }

  async update(
    TrainingPlansID: string,
    data: UpdateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    const plan = await this.trainingPlanRepository.findOne({
      where: { TrainingPlansID: TrainingPlansID, isDeleted: false },
    });
    if (!plan) {
      throw new NotFoundException(
        'Training plan not found or you are not authorized to modify it',
      );
    }
    const { userId, ...updateData } = data;

    Object.assign(plan, updateData);
    return this.trainingPlanRepository.save(plan);
  }

  async delete(TrainingPlansID: string): Promise<string> {
    const plan = await this.trainingPlanRepository.findOne({
      where: { TrainingPlansID: TrainingPlansID, isDeleted: false },
    });
    if (!plan) {
      throw new NotFoundException(
        'Training plan not found or you are not authorized to delete it',
      );
    }

    plan.isDeleted = true;
    await this.trainingPlanRepository.save(plan);

    return 'Training plan deleted successfully';
  }
}
