import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsController } from './event/event.controller';
import { TrainerUsersController } from './trainer-users/trainer_users.controller';
import { UsersController } from './user/user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRAINING_AGENDA_SERVICE',
        transport: Transport.TCP,
        options: { host: 'training-agenda-service', port: 3002 },
      },
    ]),
  ],
  controllers: [
    EventsController,
    TrainerUsersController,
    UsersController,
  ],
})
export class TrainingAgendaModule {}
