import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UUID } from 'crypto';

@Controller('schedule-users')
export class UsersController {
  constructor(
    @Inject('TRAINING_AGENDA_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createUserDto: any): Observable<any> {
    return this.usersService.send('createUser', createUserDto);
  }

  @Get()
  findAll(): Observable<any> {
    return this.usersService.send('findAllUsers', {});
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Observable<any> {
    return this.usersService.send('findOneUser', id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateUserDto: any,
  ): Observable<any> {
    return this.usersService.send('updateUser', { id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: UUID): Observable<any> {
    return this.usersService.send('removeUser', id);
  }
}
