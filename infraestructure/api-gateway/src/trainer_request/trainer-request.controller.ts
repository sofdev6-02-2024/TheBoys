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

@Controller('trainer-requests')
export class TrainerRequestController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Get()
  findAll(): Observable<any> {
    return this.engageHubService.send('findAllTrainerRequests', {});
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('findOneTrainerRequest', id);
  }

  @Post()
  create(@Body() createTrainerRequestDto: any): Observable<any> {
    return this.engageHubService.send(
      'createTrainerRequest',
      createTrainerRequestDto,
    );
  }

  @Put(':id')
  update(
    @Body() updateTrainerRequestDto: any,
    @Param('id') id: UUID,
  ): Observable<any> {
    return this.engageHubService.send('updateTrainerRequest', {
      id,
      updateTrainerRequestDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('removeTrainerRequest', id);
  }

  @Get('user/:id')
  findOneByUserId(@Param('id') id: UUID): Observable<any> {
    return this.engageHubService.send('findTrainerRequestByUserId', id);
  }
}
