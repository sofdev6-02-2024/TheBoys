import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEvent } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(ScheduleEvent)
    private readonly eventRepository: Repository<ScheduleEvent>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<ScheduleEvent> {
    const user = await this.userRepository.findOne({
      where: { userId: createEventDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createEventDto.userId} not found.`);
    }

    const event = this.eventRepository.create({
      ...createEventDto,
      user,
    });
    return this.eventRepository.save(event);
  }

  async findAll(): Promise<ScheduleEvent[]> {
    return this.eventRepository.find({
      where: {
        isCancelled: false,
      },
    });
  }

  async findOne(id: UUID): Promise<ScheduleEvent> {
    const event = await this.eventRepository.findOne({
      where: { eventId: id, isCancelled: false },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
    return event;
  }

  async update(id: UUID, updateEventDto: UpdateEventDto): Promise<ScheduleEvent> {
    const event = await this.findOne(id);
    const updatedEvent = { ...event, ...updateEventDto };
    return this.eventRepository.save(updatedEvent);
  }

  async remove(id: UUID): Promise<void> {
    const event = await this.findOne(id);
    event.isCancelled = true;
    await this.eventRepository.remove(event);
  }
}
