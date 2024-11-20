import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRequestController } from './trainter-request.controller';
import { TrainerRequestService } from './trainter-request.service';
import { TrainerRequest } from './entities/trainter-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerRequest])],
  controllers: [TrainerRequestController],
  providers: [TrainerRequestService],
})
export class TrainerRequestModule {}
