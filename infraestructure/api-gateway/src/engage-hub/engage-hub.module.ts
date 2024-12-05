import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExercisesController } from './exercises/exercises.controller';
import { RoutinesController } from './routines/routines.controller';
import { TrainerRequestController } from './trainer-request/trainer-request.controller';
import { MailerController } from './mailer/mailer.controller';
import { CommunitiesController } from './communities/communities.controller';
import { TrainingPlanController } from './training-plan/training-plan.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ENGAGE_HUB_SERVICE',
        transport: Transport.TCP,
        options: { host: 'engage-hub-service', port: 3001 },
      },
    ]),
  ],
  controllers: [
    RoutinesController,
    ExercisesController,
    TrainerRequestController,
    MailerController,
    CommunitiesController,
    TrainingPlanController,
  ],
})
export class EngageHubModule {}
