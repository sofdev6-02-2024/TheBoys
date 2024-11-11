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
  
  @Controller('users')
  export class UsersController {
    constructor(
      @Inject('AUTH_SERVICE')
      private readonly authService: ClientProxy,
    ) {}
  
    @Get()
    findAll(): Observable<any> {
      return this.authService.send('findAllUsers', {});
    }
  
    @Get(':id')
    findOne(@Param('id') id: UUID): Observable<any> {
      return this.authService.send('findOneUser', id);
    }
  
    @Post()
    create(@Body() createUserDto: any): Observable<any> {
      return this.authService.send('createUser', createUserDto);
    }
  
    @Put(':id')
    update(
      @Body() updateUserDto: any,
      @Param('id') id: UUID,
    ): Observable<any> {
      return this.authService.send('updateUser', {
        id,
        updateUserDto,
      });
    }
  
    @Delete(':id')
    remove(@Param('id') id: UUID): Observable<any> {
      return this.authService.send('removeUser', id);
    }
  }