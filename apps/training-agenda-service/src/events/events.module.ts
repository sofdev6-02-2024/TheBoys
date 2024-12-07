import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ScheduleEvent } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEvent])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
