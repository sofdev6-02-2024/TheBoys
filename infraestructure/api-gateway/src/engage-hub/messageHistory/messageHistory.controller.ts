import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { Unprotected } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';

@Controller('messageHistory')
export class MessageHistoryController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Get()
  @Unprotected()
  findAll(): Observable<any> {
    return this.engageHubService.send('findAllMessageHistory', {});
  }

  @Get(':id')
  @Unprotected()
  findOne(@Param('id') id: number): Observable<any> {
    return this.engageHubService.send('findOneMessageHistory', id);
  }

  @Post()
  @Unprotected()
  create(@Body() createRoutineDto: any): Observable<any> {
    return this.engageHubService.send('createMessageHistory', createRoutineDto);
  }

  @Put(':id')
  @Unprotected()
  update(
    @Body() updateCommunityDto: any,
    @Param('id') id: UUID,
  ): Observable<any> {
    return this.engageHubService.send('updateMessageHistory', {
      id,
      updateCommunityDto,
    });
  }


  @Delete(':id')
  @Unprotected()
  remove(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('removeMessageHistory', id);
  }

  @Get('community/:communityId')
  @Unprotected()
  findMessagesByCommunity(@Param('communityId') communityId: string): Observable<any> {
    return this.engageHubService.send('findMessagesByCommunity', communityId);
  }
}
