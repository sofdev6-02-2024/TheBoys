import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserInformationsService } from './users-informations.service';
import { CreateUserInformationDto } from './dto/create-users-information.dto';
import { UpdateUserInformationDto } from './dto/update-users-information.dto';
import { Types } from 'mongoose';
import { UserInformation } from './entities/users-information.entity';

@Controller('users-information')
export class UserInformationsController {
  constructor(private userInformationsService: UserInformationsService) {}

  @MessagePattern('createUsersInfo')
  create(@Payload() createUsersInformationDto: CreateUserInformationDto) {
    return this.userInformationsService.create(createUsersInformationDto);
  }

  @MessagePattern('findAllUsersInfo')
  findAll(): Promise<UserInformation[]> {
    return this.userInformationsService.findAll();
  }

  @MessagePattern('findOneUsersInfo')
  findOne(@Payload() id: Types.ObjectId) {
    return this.userInformationsService.findOne(id);
  }

  @MessagePattern('updateUsersInfo')
  update(
    @Payload()
    payload: {
      id: Types.ObjectId;
      updateUserInfoDto: UpdateUserInformationDto;
    },
  ) {
    const { id, updateUserInfoDto } = payload;
    return this.userInformationsService.update(id, updateUserInfoDto);
  }

  @MessagePattern('removeUsersInfo')
  remove(@Payload() id: Types.ObjectId) {
    return this.userInformationsService.remove(id);
  }
}
