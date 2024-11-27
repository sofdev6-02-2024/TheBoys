import { Controller } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { UUID } from 'crypto';

@Controller()
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @MessagePattern('createCommunity')
  create(@Payload() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @MessagePattern('findAllCommunities')
  find() {
    return this.communitiesService.find();
  }

  @MessagePattern('findOneCommunity')
  findOne(@Payload() id: UUID) {
    return this.communitiesService.findOne(id);
  }

  @MessagePattern('updateCommunity')
  update(
    @Payload() payload: { id: UUID; updateCommunityDto: UpdateCommunityDto },
  ) {
    const { id, updateCommunityDto } = payload;
    return this.communitiesService.update(id, updateCommunityDto);
  }

  @MessagePattern('removeCommunity')
  delete(@Payload() id: UUID) {
    return this.communitiesService.delete(id);
  }
}
