import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersInformation } from './entities/users-information.entity';
import { CreateUsersInformationDto } from './dto/create-users-information.dto';
import { UpdateUsersInformationDto } from './dto/update-users-information.dto';

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

  async findOne(id: number) {
    return await this.usersInformationRepository.findOneBy({id});
  }

  async update(id: number, updateUsersInformationDto: UpdateUsersInformationDto) {
    return await this.usersInformationRepository.update(id, updateUsersInformationDto);
  }

  async remove(id: number) {
    return await this.usersInformationRepository.softDelete({id});
  }
}
  

