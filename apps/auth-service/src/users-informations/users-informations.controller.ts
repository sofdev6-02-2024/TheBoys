import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersInformationsService } from './users-informations.service';
import { CreateUsersInformationDto } from './dto/create-users-information.dto';
import { UpdateUsersInformationDto } from './dto/update-users-information.dto';

@Controller('users-informations')
export class UsersInformationsController {
  constructor(private readonly usersInformationsService: UsersInformationsService) {}

  @Post()
  create(@Body() createUsersInformationDto: CreateUsersInformationDto) {
    return this.usersInformationsService.create(createUsersInformationDto);
  }

  @Get()
  findAll() {
    return this.usersInformationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersInformationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersInformationDto: UpdateUsersInformationDto) {
    return this.usersInformationsService.update(+id, updateUsersInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersInformationsService.remove(+id);
  }
}
