import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrainingPlanService } from './training-plan.service';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { UUID } from 'crypto';

@Controller('training-plan')
export class TrainingPlanController {
  constructor(private readonly trainingPlanService: TrainingPlanService) {}

  @MessagePattern('createTrainingPlan')
  create(@Payload() createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.trainingPlanService.create(createTrainingPlanDto);
  }

  @MessagePattern('findAllTrainingPlans')
  findAll() {
    return this.trainingPlanService.findAll();
  }

  @MessagePattern('findTrainingPlanById')
  findById(
    @Payload()
    payload: {
      trainingPlanId: string;
    },
  ) {
    const { trainingPlanId } = payload;
    return this.trainingPlanService.findById(trainingPlanId);
  }

  @MessagePattern('updateTrainingPlan')
  update(
    @Payload()
    payload: {
      id: UUID;
      updateTrainingPlanDto: UpdateTrainingPlanDto;
    },
  ) {
    const { id, updateTrainingPlanDto } = payload;
    return this.trainingPlanService.update(id, updateTrainingPlanDto);
  }

  @MessagePattern('deleteTrainingPlan')
  delete(
    @Payload()
    payload: {
      id: UUID;
    },
  ) {
    const { id } = payload;
    return this.trainingPlanService.delete(id);
  }
}
