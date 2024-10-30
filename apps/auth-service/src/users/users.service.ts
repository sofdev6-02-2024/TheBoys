import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: UUID) {  // Cambiado de number a UUID
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {  // Cambiado de number a UUID
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: UUID) {  // Cambiado de number a UUID
    return await this.userRepository.softDelete({ id });
  }
}
