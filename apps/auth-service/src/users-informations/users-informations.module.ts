import { Module } from '@nestjs/common';
import { UsersInformationsService } from './users-informations.service';
import { UsersInformationsController } from './users-informations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInformation } from './entities/users-information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersInformation])],
  controllers: [UsersInformationsController],
  providers: [UsersInformationsService],
})
export class UsersInformationsModule {}