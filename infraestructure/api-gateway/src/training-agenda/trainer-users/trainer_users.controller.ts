import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UUID } from 'crypto';

@Controller('trainer-users')
export class TrainerUsersController {
  constructor(
    @Inject('TRAINING_AGENDA_SERVICE') private readonly trainerUsersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTrainerUserDto: any): Observable<any> {
    return this.trainerUsersService.send('createTrainerUser', createTrainerUserDto);
  }

  @Get()
  findAll(): Observable<any> {
    return this.trainerUsersService.send('findAllTrainerUsers', {});
  }

  @Get(':trainerId')
  findOne(@Param('trainerId') trainerId: UUID): Observable<any> {
    return this.trainerUsersService.send('findOneTrainerUser', trainerId);
  }

  @Patch(':trainerId')
  update(
    @Param('trainerId') trainerId: UUID,
    @Body() updateTrainerUserDto: any,
  ): Observable<any> {
    return this.trainerUsersService.send('updateTrainerUser', {
      trainerId,
      updateTrainerUserDto,
    });
  }

  @Delete(':trainerId')
  remove(@Param('trainerId') trainerId: UUID): Observable<any> {
    return this.trainerUsersService.send('removeTrainerUser', trainerId);
  }
}
