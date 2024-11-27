import { Injectable } from '@nestjs/common';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { UUID } from 'crypto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entitites/community.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

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

    console.log(community);

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
}
