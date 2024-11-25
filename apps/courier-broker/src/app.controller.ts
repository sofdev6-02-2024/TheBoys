import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('T')
  async handleUpdateTrainerRequest(data: string) {
    console.log('Evento recibido:', data);
    return data;
}
}