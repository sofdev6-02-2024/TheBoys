import { Module } from '@nestjs/common';
import { CommunitiesService } from './messageHistory.service';
import { CommunitiesController } from './messageHistory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageHistory } from './entitites/messageHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageHistory])],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
})
export class MessageHistoryModule {}
