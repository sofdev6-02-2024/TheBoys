import { Module } from '@nestjs/common';
import { TrainerStatusController } from './trainer-status.controller';
import { TrainerStatusService } from './trainer-status.service';
import { MailerModule } from '../mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [TrainerStatusController],
  providers: [TrainerStatusService],
  exports: [TrainerStatusService],
})
export class TrainerStatusModule {}
