import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerUsersService } from './trainer-users.service';
import { CreateTrainerUserDto } from './dto/create-trainer-user.dto';
import { UpdateTrainerUserDto } from './dto/update-trainer-user.dto';
import { UUID } from 'crypto';

@Controller()
export class TrainerUsersController {
  constructor(private readonly trainerUsersService: TrainerUsersService) {}

  @MessagePattern('createTrainerUser')
  create(@Payload() createTrainerUserDto: CreateTrainerUserDto) {
    return this.trainerUsersService.create(createTrainerUserDto);
  }

  @MessagePattern('findAllTrainerUsers')
  findAll() {
    return this.trainerUsersService.findAll();
  }

  @MessagePattern('findOneTrainerUser')
  findOne(@Payload() trainerId: UUID) {
    return this.trainerUsersService.findOne(trainerId);
  }

  @MessagePattern('updateTrainerUser')
  update(@Payload() payload: { trainerId: UUID; updateTrainerUserDto: UpdateTrainerUserDto }) {
    return this.trainerUsersService.update(payload.trainerId, payload.updateTrainerUserDto);
  }

  @MessagePattern('removeTrainerUser')
  remove(@Payload() trainerId: UUID) {
    return this.trainerUsersService.remove(trainerId);
  }
}
