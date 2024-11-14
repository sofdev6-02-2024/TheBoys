import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserSchema } from './entities/user.entity';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersInformationsModule } from 'src/users-informations/users-informations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => UsersInformationsModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
