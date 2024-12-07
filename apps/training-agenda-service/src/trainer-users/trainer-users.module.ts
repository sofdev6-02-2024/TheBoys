import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerUsersService } from './trainer-users.service';
import { TrainerUsersController } from './trainer-users.controller';
import { TrainerUser } from './entities/trainer-user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerUser]),
    UsersModule
  ],
  controllers: [TrainerUsersController],
  providers: [TrainerUsersService],
})
export class TrainerUsersModule {}
