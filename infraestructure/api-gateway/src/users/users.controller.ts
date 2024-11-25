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
import { Types } from 'mongoose';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
  ) {}

  @Get()
  @Unprotected()
  findAll(): Observable<any> {
    return this.authService.send('findAllUsers', {});
  }

  @Get(':id')
  @Unprotected()
  findOne(@Param('id') id: string): Observable<any> {
    return this.authService.send('findOneUser', id);
  }

  @Post()
  @Unprotected()
  create(@Body() createUserDto: any): Observable<any> {
    return this.authService.send('createUser', createUserDto);
  }

  @Put(':id')
  @Unprotected()
  update(
    @Body() updateUserDto: any,
    @Param('id') id: Types.ObjectId,
  ): Observable<any> {
    return this.authService.send('updateUser', {
      id: id,
      updateUserDto,
    });
  }

  @Delete(':id')
  @Unprotected()
  @Roles({ roles: ['admin'] })
  remove(@Param('id') id: Types.ObjectId): Observable<any> {
    return this.authService.send('removeUser', id);
  }
}
