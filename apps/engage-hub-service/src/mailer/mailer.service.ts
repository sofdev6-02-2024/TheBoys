import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendEmail(to: string, subject: string, body: string, imageUrl: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      html: body,
      attachments: [
        {
          filename: 'body-bost.jpg',
          path: join(__dirname, '..', imageUrl),
        },
      ],
    });
  }
}
