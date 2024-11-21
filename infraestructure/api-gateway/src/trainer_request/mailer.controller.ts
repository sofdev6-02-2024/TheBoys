import { Controller, Inject, Body, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('mailes')
export class MailerController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Post('send')
  sendEmail(@Body() sendEmailDto: any): Observable<any> {
    const { toEmail, subject, body, comments, signature } = sendEmailDto;

    return this.engageHubService.send('sendEmail', {
      toEmail,
      subject,
      body,
      comments,
      signature,
    });
  }
}
