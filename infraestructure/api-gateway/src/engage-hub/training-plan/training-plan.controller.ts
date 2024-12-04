import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { Inject } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { UUID } from 'crypto';
  
  @Controller('training-plans')
  export class TrainingPlanController {
    constructor(
      @Inject('ENGAGE_HUB_SERVICE')
      private readonly engageHubService: ClientProxy,
    ) {}
  
    @Post()
    create(@Body() createTrainingPlanDto: any): Observable<any> {
      return this.engageHubService.send('createTrainingPlan', createTrainingPlanDto);
    }
  
    @Get(':coachId')
    findByCoach(@Param('coachId') coachId: UUID): Observable<any> {
      return this.engageHubService.send('findTrainingPlansByCoach', coachId);
    }
  
    @Put(':id')
    update(
      @Param('id') id: UUID,
      @Body() updateTrainingPlanDto: any,
    ): Observable<any> {
      return this.engageHubService.send('updateTrainingPlan', {
        id,
        updateTrainingPlanDto,
      });
    }
  
    @Delete(':id')
    delete(
      @Param('id') id: UUID,
      @Body('userId') userId: string,
    ): Observable<any> {
      return this.engageHubService.send('deleteTrainingPlan', { id, userId });
    }
  }
  