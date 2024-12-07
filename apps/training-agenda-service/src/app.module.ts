import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TrainerUsersModule } from './trainer-users/trainer-users.module';

@Module({
  imports: [UsersModule, EventsModule, TrainerUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
