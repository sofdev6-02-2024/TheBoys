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
import { Observable } from 'rxjs';

@Controller('users-information')
export class UsersInformationController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
  ) {}

  @Get()
  findAll(): Observable<any> {
    return this.authService.send('findAllUsersInfo', {});
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId): Observable<any> {
    return this.authService.send('findOneUsersInfo', id);
  }

  @Post()
  create(@Body() createUserInfoDto: any): Observable<any> {
    return this.authService.send('createUsersInfo', createUserInfoDto);
  }

  @Put(':id')
  update(
    @Body() updateUserInfoDto: any,
    @Param('id') id: Types.ObjectId,
  ): Observable<any> {
    return this.authService.send('updateUsersInfo', {
      id: id,
      updateUserInfoDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId): Observable<any> {
    return this.authService.send('removeUsersInfo', id);
  }
}
