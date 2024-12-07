import { Injectable } from '@nestjs/common';
import { UpdateMessageHistoryDto } from './dto/update-messageHistory.dto';
import { UUID } from 'crypto';
import { CreateMessageHistoryDto } from './dto/create-messageHistory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHistory } from './entitites/messageHistory.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(MessageHistory)
    private readonly communityRepository: Repository<MessageHistory>,
  ) {}

  create(createCommunityDto: CreateMessageHistoryDto) {
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

  update(id: UUID, updateCommunityDto: UpdateMessageHistoryDto) {
    return this.communityRepository.update(id, updateCommunityDto);
  }

  delete(id: UUID) {
    return this.communityRepository.softDelete(id);
  }

  async findMessagesByCommunity(communityId: string): Promise<MessageHistory[]> {
    const messages = await this.communityRepository.find({
      where: { communityId },
    });

    if (!messages || messages.length === 0) {
      throw new RpcException({
        statusCode: 404,
        message: 'No messages found for the specified community',
      });
    }

    return messages;
  }
  

}
