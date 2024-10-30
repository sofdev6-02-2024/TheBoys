import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersInformationsService } from './users-informations.service';
import { CreateUsersInformationDto } from './dto/create-users-information.dto';
import { UpdateUsersInformationDto } from './dto/update-users-information.dto';

@Controller('users-information')
export class UsersInformationsController {
  constructor(private readonly usersInformationsService: UsersInformationsService) {}

  @MessagePattern('createUsersInfo')
  create(@Payload() createUsersInformationDto: CreateUsersInformationDto) {
    return this.usersInformationsService.create(createUsersInformationDto);
  }

  @MessagePattern('findAllUsersInfo')
  findAll() {
    return this.usersInformationsService.findAll();
  }

  @MessagePattern('findOneUsersInfo')
  findOne(@Payload() id: number) {
    return this.usersInformationsService.findOne(id);
  }

  @MessagePattern('updateUsersInfo')
  update(@Payload() payload: { id: number; updateUsersInformationDto: UpdateUsersInformationDto }) {
    const { id, updateUsersInformationDto } = payload;
    return this.usersInformationsService.update(id, updateUsersInformationDto);
  }

  @MessagePattern('removeUsersInfo')
  remove(@Payload() id: number) {
    return this.usersInformationsService.remove(id);
  }
}
