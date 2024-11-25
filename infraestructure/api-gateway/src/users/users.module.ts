import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersInformationController } from './users.information.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth-service', port: 3005 },
      },
    ]),
  ],
  controllers: [UsersController, UsersInformationController],
})
export class UsersModule {}
