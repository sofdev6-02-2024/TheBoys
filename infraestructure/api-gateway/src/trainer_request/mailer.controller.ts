import { Controller, Inject, Body, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

@Controller('mailer')
export class MailerController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
  ) {}

  @Post()
  sendEmail(@Body() sendEmailDto: any): Observable<any> {
    const { toEmail, subject, body, comments, signature } = sendEmailDto;

    return this.engageHubService
      .send(
        { cmd: 'sendEmailMailer' },
        {
          toEmail,
          subject,
          body,
          comments,
          signature,
        },
      )
      .pipe(
        map((response) => {
          return {
            success: true,
            message: 'Email sent successfully',
            data: response,
          };
        }),
      );
  }
}
