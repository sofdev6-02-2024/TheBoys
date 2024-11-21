import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('exercises')
export class ExercisesController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Get()
  getExercises(): Observable<any> {
    return this.engageHubService.send('getExercises', {});
  }

  @Get(':name')
  getExercisesByName(@Param('name') name: string): Observable<any> {
    return this.engageHubService.send('getExercisesByName', { name });
  }

  @Get('exercise/:id')
  getExercisesById(@Param('id') id: string) {
    return this.engageHubService.send('getExerciseById', { id });
  }
}
