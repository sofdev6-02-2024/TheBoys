import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'payment-service',
        port: 3004,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints),
        }));
        throw new RpcException({
          statusCode: 400,
          message: errorMessages,
          error: 'Bad Request',
        });
      },
    }),
  );
  await app.listen();
}
bootstrap();
