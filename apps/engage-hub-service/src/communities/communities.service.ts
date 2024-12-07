import { Injectable } from '@nestjs/common';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { UUID } from 'crypto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entitites/community.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { UpdateCommunityUsersDto } from './dto/UpdateCommunityUsers.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  create(createCommunityDto: CreateCommunityDto) {
    const community = this.communityRepository.create(createCommunityDto);
    return this.communityRepository.save(community);
  }

  find() {
    return this.communityRepository.find();
  }

  async findOne(id: UUID) {
    const community = await this.communityRepository.findOneBy({ id });

    if (!community)
      throw new RpcException({
        statusCode: 404,
        message: 'Community does not exists',
      });

    return community;
  }

  update(id: UUID, updateCommunityDto: UpdateCommunityDto) {
    return this.communityRepository.update(id, updateCommunityDto);
  }

  delete(id: UUID) {
    return this.communityRepository.softDelete(id);
  }
  
  async updateUsers(id: UUID, updateCommunityUsersDto: UpdateCommunityUsersDto) {
    const community = await this.communityRepository.findOneBy({ id });
  
    if (!community) {
      throw new RpcException({
        statusCode: 404,
        message: 'Community does not exist',
      });
    }
    const existingUsers = community.users || [];
    const newUsers = updateCommunityUsersDto.users || [];
    const updatedUsers = Array.from(new Set([...existingUsers, ...newUsers]));
  
    community.users = updatedUsers;
  
    return await this.communityRepository.save(community);
  }
}
