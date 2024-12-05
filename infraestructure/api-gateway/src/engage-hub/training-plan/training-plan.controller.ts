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
import { Unprotected } from 'nest-keycloak-connect';

@Controller('training-plans')
export class TrainingPlanController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Post()
  @Unprotected()
  create(@Body() createTrainingPlanDto: any): Observable<any> {
    return this.engageHubService.send(
      'createTrainingPlan',
      createTrainingPlanDto,
    );
  }

  @Get()
  @Unprotected()
  findAll(): Observable<any> {
    return this.engageHubService.send('findAllTrainingPlans', {});
  }

  @Get(':id')
  @Unprotected()
  findByCoach(@Param('id') trainingPlanId: UUID): Observable<any> {
    return this.engageHubService.send('findTrainingPlanById', trainingPlanId);
  }

  @Put(':id')
  @Unprotected()
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
  @Unprotected()
  delete(
    @Param('id') id: UUID,
  ): Observable<any> {
    return this.engageHubService.send('deleteTrainingPlan', { id });
  }
}
