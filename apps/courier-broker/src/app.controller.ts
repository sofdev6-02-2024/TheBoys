import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('updateTrainerRequest')
  async handleUpdateTrainerRequest(data: string) {
    console.log(data);
    return data;
  }
}
