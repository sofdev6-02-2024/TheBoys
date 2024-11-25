import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/trainer-status.dto';
import * as path from 'path';
import { MailerService } from '../mailer.service';

@Injectable()
export class TrainerStatusService {
  constructor(private mailerService: MailerService) {}

  private getAcceptedMessage(): string {
    return 'Congratulations! Your application to become a trainer at Body Boost has been approved. We look forward to having you on our team!';
  }

  private getRejectedMessage(): string {
    return 'Thank you for your application. Unfortunately, your trainer application was not approved. We encourage you to apply again in the future.';
  }

  private getDiscontinuedMessage(): string {
    return 'We regret to inform you that your trainer application has been discontinued. Please reach out if you have any questions.';
  }

  private bodyMessages = {
    Accepted: this.getAcceptedMessage,
    Rejected: this.getRejectedMessage,
    Discontinued: this.getDiscontinuedMessage,
  };

  async create(createMailerDto: SendEmailDto) {
    const { toEmail, status, comments } = createMailerDto;

    const subject = 'Update on Your Trainer Application Status';
    const title = 'Trainer Application Status Update';
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'resources',
      'images',
      'body_boost.jpg',
    );
    const body = this.bodyMessages[status]?.();
    const commentsSection = comments
      ? `<p><strong>Comments:</strong> ${comments}</p>`
      : '';
    const textClosing = 'Best regards, The Admin Team, Body Boost';
    const imageCid = 'body_boost_image';
    const imageText = 'Body Boost Image';

    const result = await this.mailerService.sendEmail(
      toEmail,
      subject,
      title,
      imagePath,
      status,
      body,
      commentsSection,
      textClosing,
      imageCid,
      imageText,
    );

    console.log(result);
    return `Email sent to ${toEmail}`;
  }
}
