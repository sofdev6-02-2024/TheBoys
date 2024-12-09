import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UUID } from 'crypto';

@Controller('schedule-events')
export class EventsController {
  constructor(
    @Inject('TRAINING_AGENDA_SERVICE') private readonly eventsService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createEventDto: any): Observable<any> {
    return this.eventsService.send('createEvent', createEventDto);
  }

  @Get()
  findAll(): Observable<any> {
    return this.eventsService.send('findAllEvents', {});
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Observable<any> {
    return this.eventsService.send('findOneEvent', id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateEventDto: any,
  ): Observable<any> {
    return this.eventsService.send('updateEvent', { id, updateEventDto });
  }

  @Delete(':id')
  remove(@Param('id') id: UUID): Observable<any> {
    return this.eventsService.send('removeEvent', id);
  }
}