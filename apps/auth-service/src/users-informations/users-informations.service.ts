import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersInformation } from './entities/users-information.entity';
import { CreateUsersInformationDto } from './dto/create-users-information.dto';
import { UpdateUsersInformationDto } from './dto/update-users-information.dto';
import { UUID } from 'crypto';

@Injectable()
export class UsersInformationsService {

  constructor(
    @InjectRepository(UsersInformation)
    private readonly usersInformationRepository: Repository<UsersInformation>,
  ) {}

  async create(createUsersInformationDto: CreateUsersInformationDto) {
    return await this.usersInformationRepository.save(createUsersInformationDto);
  }

  async findAll() {
    return await this.usersInformationRepository.find();
  }

  async findOne(id: UUID) {
    return await this.usersInformationRepository.findOneBy({id});
  }

  async update(id: UUID, updateUsersInformationDto: UpdateUsersInformationDto) {
    return await this.usersInformationRepository.update(id, updateUsersInformationDto);
  }

  async remove(id: UUID) {
    return await this.usersInformationRepository.softDelete({id});
  }
}
  

