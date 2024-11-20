import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { CreateTrainerRequestDto } from './dto/create-trainter-request.dto';
import { UpdateTrainerRequestDto } from './dto/update-trainter-request.dto';
import { TrainerRequestService } from './trainter-request.service';

@Controller('trainer-request')
export class TrainerRequestController {
  constructor(private readonly trainerRequestService: TrainerRequestService) {}

  @MessagePattern('createTrainerRequest')
  create(@Payload() createTrainerRequestDto: CreateTrainerRequestDto) {
    return this.trainerRequestService.create(createTrainerRequestDto);
  }

  @MessagePattern('findAllTrainerRequests')
  findAll() {
    return this.trainerRequestService.findAll();
  }

  @MessagePattern('findOneTrainerRequest')
  findOne(@Payload() id: UUID) {
    return this.trainerRequestService.findOne(id);
  }

  @MessagePattern('updateTrainerRequest')
  update(@Payload() payload: { id: UUID; updateTrainerRequestDto: UpdateTrainerRequestDto }) {
    const { id, updateTrainerRequestDto } = payload;
    return this.trainerRequestService.update(id, updateTrainerRequestDto);
  }

  @MessagePattern('removeTrainerRequest')
  remove(@Payload() id: UUID) {
    return this.trainerRequestService.remove(id);
  }

  @MessagePattern('findOneActiveRequestByUserId')
  findOneActiveRequestByUserId(@Payload() userId: UUID) {
    return this.trainerRequestService.findOneActiveRequestByUserId(userId);
  }
}
