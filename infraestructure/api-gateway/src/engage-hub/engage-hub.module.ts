import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExercisesController } from './exercises/exercises.controller';
import { RoutinesController } from './routines/routines.controller';

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
  controllers: [RoutinesController, ExercisesController],
})
export class EngageHubModule {}