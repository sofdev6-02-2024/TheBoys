import { Controller, Inject, Body, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Unprotected } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';

@Controller('mailers')
export class MailerController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}
  
  @Post()
  @Unprotected()
  create(@Body() createRoutineDto: any): Observable<any> {
    return this.engageHubService.send('createMailer', createRoutineDto);
  }
}
