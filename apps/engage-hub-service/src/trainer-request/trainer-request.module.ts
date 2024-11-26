import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRequest } from './entities/trainer-request.entity';
import { TrainerRequestController } from './trainer-request.controller';
import { TrainerRequestService } from './trainer-request.service';
import { TrainerStatusModule } from 'src/mailer/trainer-status/trainer-status.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainerRequest]),
    TrainerStatusModule,
    ClientsModule.register([
      {
        name: 'ENGAGE_HUB_BUS_EVENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://pavmrrlo:ZbV7I0bm_f1r6hil6ajQ7pIvWJI7xjp6@duck.lmq.cloudamqp.com/pavmrrlo',
          ],
          queue: 'trainer_requests',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [TrainerRequestController],
  providers: [TrainerRequestService],
})
export class TrainerRequestModule {}
