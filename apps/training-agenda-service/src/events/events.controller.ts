import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UUID } from 'crypto';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('createEvent')
  create(@Payload() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @MessagePattern('findAllEvents')
  findAll() {
    return this.eventsService.findAll();
  }

  @MessagePattern('findOneEvent')
  findOne(@Payload() id: UUID) {
    return this.eventsService.findOne(id);
  }

  @MessagePattern('updateEvent')
  update(@Payload() payload: { id: UUID; updateEventDto: UpdateEventDto }) {
    return this.eventsService.update(payload.id, payload.updateEventDto);
  }

  @MessagePattern('removeEvent')
  remove(@Payload() id: UUID) {
    return this.eventsService.remove(id);
  }
}
