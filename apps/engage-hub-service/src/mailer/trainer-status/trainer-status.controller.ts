import { Controller } from '@nestjs/common';
import { SendEmailDto } from './dto/trainer-status.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerStatusService } from './trainer-status.service';

@Controller('mailer')
export class TrainerStatusController {
  constructor(private readonly mailerService: TrainerStatusService) {}

  @MessagePattern('createMailer')
  create(@Payload() createRoutineDto: SendEmailDto) {
    return this.mailerService.create(createRoutineDto);
  }
}
