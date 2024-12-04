import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    const ObjectId = new Types.ObjectId(id);
    return this.usersService.findOne(ObjectId);
  }

  @MessagePattern('updateUser')
  update(
    @Payload() payload: { id: Types.ObjectId; updateUserDto: UpdateUserDto },
  ) {
    const { id, updateUserDto } = payload;
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
