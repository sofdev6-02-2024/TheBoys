import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: UUID) { 
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() payload: { id: UUID; updateUserDto: UpdateUserDto }) {  
    const { id, updateUserDto } = payload;
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: UUID) {
    return this.usersService.remove(id);
  }
}