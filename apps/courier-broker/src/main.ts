import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );

  await app.listen();
}

bootstrap();
