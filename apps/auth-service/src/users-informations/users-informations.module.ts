import { forwardRef, Module } from '@nestjs/common';
import { UserInformationsService } from './users-informations.service';
import { UserInformationsController } from './users-informations.controller';
import { UserInformationSchema } from './entities/users-information.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserInformation', schema: UserInformationSchema },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [UserInformationsController],
  providers: [UserInformationsService],
  exports: [UserInformationsService],
})
export class UsersInformationsModule {}
