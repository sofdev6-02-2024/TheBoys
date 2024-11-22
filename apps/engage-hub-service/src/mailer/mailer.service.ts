import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendEmail(toEmail: string, subject: string, body: string, imageUrl: string) {
    try {
      await this.mailerService.sendMail({
        to: toEmail,
        subject,
        html: body,
        attachments: [
          {
            filename: 'body-bost.jpg',
            path: join(process.cwd(), imageUrl),
          },
        ],
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('The email could not be sent. Please try again.');
    }
  }
}
