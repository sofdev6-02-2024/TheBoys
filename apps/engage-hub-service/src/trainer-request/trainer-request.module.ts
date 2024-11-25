import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRequest } from './entities/trainer-request.entity';
import { TrainerRequestController } from './trainer-request.controller';
import { TrainerRequestService } from './trainer-request.service';
import { TrainerStatusModule } from 'src/mailer/trainer-status/trainer-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerRequest]), TrainerStatusModule],
  controllers: [TrainerRequestController],
  providers: [TrainerRequestService],
})
export class TrainerRequestModule {}
