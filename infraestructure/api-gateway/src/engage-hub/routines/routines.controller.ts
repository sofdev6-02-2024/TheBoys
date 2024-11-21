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

@Controller('routines')
export class RoutinesController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Get()
  @Unprotected()
  findAll(): Observable<any> {
    return this.engageHubService.send('findAllRoutines', {});
  }

  @Get(':id')
  @Unprotected()
  findOne(@Param('id') id: number): Observable<any> {
    return this.engageHubService.send('findOneRoutine', id);
  }

  @Post()
  @Unprotected()
  create(@Body() createRoutineDto: any): Observable<any> {
    return this.engageHubService.send('createRoutine', createRoutineDto);
  }

  @Put(':id')
  @Unprotected()
  update(
    @Body() updateRoutineDto: any,
    @Param('id') id: UUID,
  ): Observable<any> {
    return this.engageHubService.send('updateRoutine', {
      id,
      updateRoutineDto,
    });
  }

  @Delete(':id')
  @Unprotected()
  remove(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('removeRoutine', id);
  }

  @Get('user/:id')
  @Unprotected()
  findOneByUserId(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('findOneByUserId', id);
  }
}
