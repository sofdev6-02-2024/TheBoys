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
import { Observable } from 'rxjs';

@Controller('routines')
export class RutinesController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Get()
  findAll(): Observable<any> {
    return this.engageHubService.send('findAllRoutines', {});
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    return this.engageHubService.send('findOneRoutine', id);
  }

  @Post()
  create(@Body() createRoutineDto: any): Observable<any> {
    return this.engageHubService.send('createRoutine', createRoutineDto);
  }

  @Put(':id')
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
  remove(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('removeRoutine', id);
  }

  @Get('user/:id')
  findOneByUserId(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('findOneByUserId', id);
  }
}
