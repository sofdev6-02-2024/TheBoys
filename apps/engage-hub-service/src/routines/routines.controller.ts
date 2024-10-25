import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { UUID } from 'crypto';

@Controller('routine')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @MessagePattern('createRoutine')
  create(@Payload() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @MessagePattern('findAllRoutines')
  findAll() {
    return this.routinesService.findAll();
  }

  @MessagePattern('findOneRoutine')
  findOne(@Payload() id: UUID) {
    return this.routinesService.findOne(id);
  }

  @MessagePattern('updateRoutine')
  update(@Payload() payload: { id: UUID; updateRoutineDto: UpdateRoutineDto }) {
    const { id, updateRoutineDto } = payload;
    return this.routinesService.update(id, updateRoutineDto);
  }

  @MessagePattern('removeRoutine')
  remove(@Payload() id: UUID) {
    return this.routinesService.remove(id);
  }
}
