import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'sendEmailMailer' })
  async sendEmail(@Payload() payload: SendEmailDto) {
    console.log('Mensaje recibido en el microservicio con payload:', payload);

    const { toEmail, subject, body, comments, signature } = payload;

    const finalBody = `
      <h2>Status: ${subject}</h2>
      <p>Comments: ${comments}</p>
      <p>Signature: ${signature}</p>
    `;

    const imageUrl = 'resources/body-bost.jpg';
    await this.mailerService.sendEmail(toEmail, subject, finalBody, imageUrl);

    return {
      status: 'success',
      message: 'Email sent successfully!',
      timestamp: new Date().toISOString(),
    };
  }
}