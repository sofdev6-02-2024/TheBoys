import { Controller } from '@nestjs/common';
import { CommunitiesService } from './messageHistory.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMessageHistoryDto } from './dto/create-messageHistory.dto';
import { UpdateMessageHistoryDto } from './dto/update-messageHistory.dto';
import { UUID } from 'crypto';

@Controller()
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @MessagePattern('createMessageHistory')
  create(@Payload() createCommunityDto: CreateMessageHistoryDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @MessagePattern('findAllMessageHistory')
  find() {
    return this.communitiesService.find();
  }

  @MessagePattern('findOneMessageHistory')
  findOne(@Payload() id: UUID) {
    return this.communitiesService.findOne(id);
  }

  @MessagePattern('updateMessageHistory')
  update(
    @Payload() payload: { id: UUID; updateCommunityDto: UpdateMessageHistoryDto },
  ) {
    const { id, updateCommunityDto } = payload;
    return this.communitiesService.update(id, updateCommunityDto);
  }

  @MessagePattern('removeMessageHistory')
  delete(@Payload() id: UUID) {
    return this.communitiesService.delete(id);
  }

  @MessagePattern('findMessagesByCommunity')
  findMessagesByCommunity(@Payload() communityId: string) {
    return this.communitiesService.findMessagesByCommunity(communityId);
  }

}
