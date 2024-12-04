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

@Controller('communities')
export class CommunitiesController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Get()
  @Unprotected()
  findAll(): Observable<any> {
    return this.engageHubService.send('findAllCommunities', {});
  }

  @Get(':id')
  @Unprotected()
  findOne(@Param('id') id: number): Observable<any> {
    return this.engageHubService.send('findOneCommunity', id);
  }

  @Post()
  @Unprotected()
  create(@Body() createRoutineDto: any): Observable<any> {
    return this.engageHubService.send('createCommunity', createRoutineDto);
  }

  @Put(':id')
  @Unprotected()
  update(
    @Body() updateCommunityDto: any,
    @Param('id') id: UUID,
  ): Observable<any> {
    return this.engageHubService.send('updateCommunity', {
      id,
      updateCommunityDto,
    });
  }

  @Put(':id/users')
  @Unprotected()
  updateUsersComunity(
    @Body() updateCommunityUsersDto: any,
    @Param('id') id: UUID,
  ): Observable<any> {
    return this.engageHubService.send('updateCommunityUsers', {
      id,
      updateCommunityUsersDto,
    });
  }

  @Delete(':id')
  @Unprotected()
  remove(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('removeCommunity', id);
  }
}
