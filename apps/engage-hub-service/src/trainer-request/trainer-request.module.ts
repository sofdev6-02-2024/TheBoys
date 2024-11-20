import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRequestController } from './trainer-request.controller';
import { TrainerRequestService } from './trainer-request.service';
import { TrainerRequest } from './entities/trainer-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerRequest])],
  controllers: [TrainerRequestController],
  providers: [TrainerRequestService],
})
export class TrainerRequestModule {}
