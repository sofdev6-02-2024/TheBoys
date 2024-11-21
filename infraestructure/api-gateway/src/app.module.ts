import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RutinesController as RoutinesController } from './routines/routines.controller';
import { ExercisesController as ExercisesController } from './exercises/exercises.controller';
import { UsersController } from './users/users.controller';
import { UsersInformationController } from './users/users.information.controller';
import { TrainerRequestController } from './trainer_request/trainer-request.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ENGAGE_HUB_SERVICE',
        transport: Transport.TCP,
        options: { host: 'engage-hub-service', port: 3001 },
      },
      {
        name: 'TRAINING_SERVICE',
        transport: Transport.TCP,
        options: { host: 'training-agenda-service', port: 3002 },
      },
      {
        name: 'AI_SERVICE',
        transport: Transport.TCP,
        options: { host: 'ai-service', port: 3003 },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'payment-service', port: 3004 },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth-service', port: 3005 },
      },
    ]),
  ],
  controllers: [
    AppController,
    RoutinesController,
    ExercisesController,
    UsersController,
    UsersInformationController,
    TrainerRequestController,
  ],
  providers: [AppService],
})
export class AppModule {}
